import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async Socket => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);


    Socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;

        const allMessages = await messagesService.listByUser(user_id);

        callback(allMessages);
    });

    Socket.on("admin_send_message", async params => {
        const { user_id, text } = params 

        await messagesService.create({
            text,
            user_id,
            admin_id: Socket.id
        });

        const { socket_id } = await connectionsService.findByUserId(user_id)

        // A mensagem sera enviada pelo socket da conversa e será emitida pelo admin_send_to_client
        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket_id
        })


    });
});