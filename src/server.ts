import express, { json } from "express";

import "./database" ; // Como o arquivo que quero importar é o index não preciso especificar isso no import
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Server is running on port 3333'));