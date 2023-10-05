const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'fasttravel',
    user: 'root',
    password: ''
});


// PASSAGEIRO --------------------------------------------------------------------------------
app.get('/passageiro', async (req, res) => {
    try {
        const passageiros = await prisma.passageiro.findMany()
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }
}); // GERAL

app.get('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.passageiro.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!passageiro) {
            res.status(404).json({ success: false, msg: 'Passageiro não encontrado' });
        } else {
            res.status(200).json(passageiro);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // POR ID

app.get('/passageiro/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        console.log(nome)
        const passageiros = await prisma.passageiro.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
        console.log(passageiros)
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }
}); // LIKE

app.post('/passageiro', async (req, res) => {
    try {
        const { id, nome, saldo, cpf, nascimento, numero, email, foto_caminho, tipo_cartao, usuario_id } = req.body
        const passageiro = await prisma.passageiro.create({
            data: {
                nome: nome,
                saldo: saldo,
                cpf: cpf,
                nascimento: `${nascimento}T00:00:00.000Z`,
                numero: numero,
                email: email,
                foto_caminho: foto_caminho,
                tipo_cartao: tipo_cartao,
                usuario: {
                    connect: {
                        id: parseInt(usuario_id)
                    }
                }
            }
        });
        res.status(201).json(passageiro);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // CADASTRAR

app.put('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, saldo, cpf, nascimento, numero, email, foto_caminho, tipo_cartao, usuario_id } = req.body
        const passageiro = await prisma.passageiro.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nome: nome,
                saldo: saldo,
                cpf: cpf,
                nascimento: `${nascimento}T00:00:00.000Z`,
                numero: numero,
                email: email,
                foto_caminho: foto_caminho,
                tipo_cartao: tipo_cartao,
                usuario: {
                    connect: {
                        id: parseInt(usuario_id)
                    }
                }
            }
        })
        res.status(200).json(passageiro);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // EDITAR

app.delete('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.passageiro.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        await prisma.passageiro.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({msg: 'passageiro deletado:', passageiro})
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // DELETAR

// MOTORISTA ------------------------------------------------------------------------------------------------
app.get('/motorista', async (req, res) => {
    try {
        const [query] = await connection.execute('select * from motorista');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }
}); // GERAL

app.get('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from motorista where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // POR ID

app.get('/motorista/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from motorista where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // LIKE

app.post('/motorista', async (req, res) => {
    try {
        const { nome, cpf, nascimento, numero, email, foto_caminho } = req.body
        const [query] = await connection.execute('insert into motorista (nome, cpf, nascimento, numero, email, foto_caminho) values (?,?,?,?,?,?)', [nome, cpf, nascimento, numero, email, foto_caminho]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // CADASTRAR

app.put('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, cpf, nascimento, numero, email, foto_caminho } = req.body
        const [query] = await connection.execute('update motorista set nome = ?, cpf = ?, nascimento = ?, numero = ?, email = ?,  foto_caminho = ? where id = ?', [nome, cpf, nascimento, numero, email, foto_caminho, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // EDITAR

app.delete('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from motorista where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // DELETAR

// LINHA ------------------------------------------------------------------------------------------------
app.get('/linha', async (req, res) => {
    try {
        const [query] = await connection.execute('select * from linha');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // GERAL

app.get('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from linha where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // POR ID

app.get('/linha/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from linha where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // LIKE

app.post('/linha', async (req, res) => {
    try {
        const { nome, email } = req.body
        const [query] = await connection.execute('insert into linha (nome, email) values (?,?)', [nome, email]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // CADASTRAR

app.put('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body
        const [query] = await connection.execute('update linha set nome = ?, email = ? where id = ?', [nome, email, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // EDITAR

app.delete('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from linha where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // DELETAR

// usuario ------------------------------------------------------------------------------------------------
app.get('/usuario', async (req, res) => {
    try {
        const [query] = await connection.execute('select * from usuario');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // GERAL

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from usuario where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // POR ID

app.get('/usuario/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from usuario where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // LIKE

app.post('/usuario', async (req, res) => {
    try {
        const { nome, email, senha, token, foto_caminho } = req.body
        const [query] = await connection.execute('insert into usuario (nome, email, senha, token, foto_caminho) values (?,?,?,?,?)', [nome, email, senha, token, foto_caminho]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // CADASTRAR

app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email, senha, token, foto_caminho } = req.body
        const [query] = await connection.execute('update usuario set nome = ?, email = ?, senha = ?, token = ?, foto_caminho = ?  where id = ?', [nome, email, senha, token, foto_caminho, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // EDITAR

app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from usuario where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
    }

}); // DELETAR

// RODANDO SERVIDOR
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
});