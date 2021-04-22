import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

// O controller é as funcionalidades de cada rota
class SettingsController {

    async create(request: Request, response: Response) {
        const { chat, username } = request.body;

        const settingsService = new SettingsService();

        try {
            // Eu vou la no meu service e acesso a classe SettingsService no método create
            const settings = await settingsService.create({ chat, username });
            return response.json(settings);
        } catch(err) {
            return response.status(400).json({ message: err.message })
        }
 
    }
}

export { SettingsController };