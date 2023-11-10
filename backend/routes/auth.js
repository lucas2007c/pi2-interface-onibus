const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

// LOGIN --------------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // verifica se o usuário existe
        const usuarioExistente = await prisma.usuario.findFirst({
            where: {
                email: email,
                invalido: null
            }
        });

        if (!usuarioExistente) {
            return res.status(401).json({ success: false, msg: 'Credenciais Inválidas' })
        }

        // Verifica se a senha está correta
        const SenhaValida = await bcrypt.compare(senha, usuarioExistente.senha)

        if (!SenhaValida) {
            return res.status(401).json({ success: false, msg: 'Credenciais Inválidas' })
        }

        // Gera token de autenticação
        const token = jwt.sign({ usuarioId: usuarioExistente.id }, process.env.SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});

router.get("/verify-token", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: "Token não fornecido. Acesso não autorizado." });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Token inválido. Acesso não autorizado." });
        }
        return res.json({ msg: "Token válido. Acesso autorizado." });
    });
});


module.exports = router;