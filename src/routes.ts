import { Router } from "express";
import { SettingsController } from "./controller/SettingsController";

const routes = Router();

// Eu pego as funcionalidades da rota do controller 
const settingsController = new SettingsController();

routes.post("/settings", settingsController.create);

export { routes };