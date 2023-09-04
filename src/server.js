require("dotenv")
require('express-async-errors')
const migrationRun = require("./database/sqlite/migrations")
const AppError = require('./utils/AppError');
const uploadConfig = require("./configs/upload")

const cors = require("cors");

const express = require('express');
const routes = require("./routes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);
migrationRun();

app.use((error, request, response, next) => {
    if(error instanceof AppError){ // erro do lado do cliente
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    };

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));



// SGBD - Sistema de Gerenciamento de Banco de Dados
