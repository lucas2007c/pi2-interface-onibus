const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
const router = express.Router();

// COUNT ------------------------------------------------------------
router.get('/count/:tabela', async (req, res) => {
    contar = async (tabela) => {
        const resultado = await prisma[tabela].count({
            where: {
                inativado: null
            }
        })
        return resultado
    } // Função para count

    try {
        const { tabela } = req.params;
        const tabelasValidas = ['motorista', 'passageiro', 'linha', 'onibus', 'viagem', 'embarque', 'usuario'];
        if (tabelasValidas.includes(tabela)) {
            const countM = await contar(tabela)
            return res.status(200).json({ success: true, msg: `${countM}` });
        }

        res.status(404).json({ success: false, msg: 'tabela não encontrada' })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});

// LOGIN --------------------------------------------------------------------
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // verifica se o usuário existe
        const usuarioExistente = await prisma.usuario.findUnique({
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

        //Gera token de autenticação
        // const token = jwt.sign({ usuarioId: usuarioExistente.id }, process.env.SECRET)
        // A SER INCREMENTADO
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});

// RECARGA ---------------------------------------------------------------------------------------------------------------
router.patch('/recarga/', async (req, res) => {
    try {
        const { cpf, valor } = req.body

        // verifica se o passageiro existe
        const passageiroExistente = await prisma.passageiro.findMany({
            where: {
                cpf: cpf,
                inativado: null
            }
        });

        if (passageiroExistente.length === 0) {
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado' })
        };

        const saldo = Number(passageiroExistente[0].saldo) + Number(valor)
        const usuario_id = Number(passageiroExistente[0].usuario_id)

        const passageiro = await prisma.passageiro.update({
            where: {
                id: passageiroExistente[0].id,
                inativado: null
            },
            data: { saldo, usuario_id }
        })
        res.status(200).json({ msg: 'Recarga realizada com sucesso', passageiro });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
});


module.exports = router;