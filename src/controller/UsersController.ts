import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";


class UsersController {
    /**
     *  O Promise<response> de create(request: Request, response: Response): Promise<Response>
     *  significa que a função terá de retornar uma response, se caso eu apagar a linha de retorno 
     * o TS vai fazer a função da erro  
     */
    async create(request: Request, response: Response): Promise<Response>{
        const { email } = request.body;

        const usersService = new UsersService();

       const user =  await usersService.create(email);
    
        return response.json(user);
    };
};

export { UsersController };