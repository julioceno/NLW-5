import express from "express";

const app = express();

app.get('/', (request, response) => {
    response.json({ message: "Ola"});
});

app.get('/', (request, response) => {
    response.json({ message: "User cadastrado com sucesso "});
});

app.listen(3333, () => console.log('Server is running on port 3333'));