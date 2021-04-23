import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams {
    text: string;
    email: string
}


io.on("connect", socket => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesService();

    socket.on("client_first_access", async params => {
        const socket_id = socket.id;
        const { text, email} = params as IParams;
        let user_id = null

        const userExists = await usersService.findByEmail(email);

        if(!userExists) { // Se o user não existe, cria um novo usuário e gera uma nova conexão
            const user = await usersService.create(email)

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id
        } else { // Se o usuário existe ele vai verificar se existe uma conexão ja pronta pra aquele user
            user_id = userExists.id

            const connection = await connectionsService.findByUserId(userExists.id) 

            if (!connection) { // Se a conexão não existir ele cria uma nova
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                });
            } else { // Se a conexão existir ele vai reutilizar ela só passando um novo id de socket
                connection.socket_id = socket_id;

                await connectionsService.create(connection)
            };

        }


        await messagesService.create({ // Cria uma nova mensagem 
            text,
            user_id
        });

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);

        const allUsers = await connectionsService.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allUsers)
    });

    socket.on("client_send_to_admin", async params => {
        const { text, socket_admin_id } = params


        const socket_id = socket.id

        const { user_id } = await connectionsService.findBySocketId(socket_id)

        // Enviando o socket
        const message = await messagesService.create({
            text,
            user_id
        });

        console.log('vou enviar  esse socket pra o adm', socket_admin_id)
        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        })


    });
});