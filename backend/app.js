const express = require('express');
const cors = require('cors')

const app = express();

const embarqueRouter = require("./routes/embarque");
const linhaRouter = require("./routes/linha");
const motoristaRouter = require("./routes/motorista");
const onibusRouter = require("./routes/onibus");
const othersRouter = require("./routes/others");
const passageiroRouter = require("./routes/passageiro");
const usuarioRouter = require("./routes/usuario");
const viagemRouter = require("./routes/viagem");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", embarqueRouter);
app.use("/", linhaRouter);
app.use("/", motoristaRouter);
app.use("/", onibusRouter);
app.use("/", othersRouter);
app.use("/", passageiroRouter);
app.use("/", usuarioRouter);
app.use("/", viagemRouter);

module.exports = app;
