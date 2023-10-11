const express = require('express');
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({ errorFormat: 'minimal' });
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

// PASSAGEIRO --------------------------------------------------------------------------------
app.get('/passageiro', async (req, res) => {
    try {
        const passageiros = await prisma.passageiro.findMany()
        res.status(200).json(passageiros);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
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
            return res.status(404).json({ success: false, msg: 'Passageiro não encontrado' });
        }

        res.status(200).json(passageiro);

    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/passageiro/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
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
        console.log(error)
    }
}); // LIKE

app.post('/passageiro', async (req, res) => {
    try {
        const { nome, saldo, cpf, nascimento, numero, email, foto_caminho, tipo_cartao, usuario_id } = req.body
        const passageiro = await prisma.passageiro.create({
            data: {
                nome,
                saldo,
                cpf,
                nascimento: `${nascimento}T00:00:00.000Z`,
                numero,
                email,
                foto_caminho,
                tipo_cartao,
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
        console.log(error)
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
                nome,
                saldo,
                cpf,
                nascimento: `${nascimento}T00:00:00.000Z`,
                numero,
                email,
                foto_caminho,
                tipo_cartao,
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
        console.log(error)
    }

}); // EDITAR

app.delete('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.passageiro.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'passageiro deletado:', passageiro })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// MOTORISTA ------------------------------------------------------------------------------------------------
app.get('/motorista', async (req, res) => {
    try {
        const motoristas = await prisma.motorista.findMany()
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }
}); // GERAL

app.get('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const motorista = await prisma.motorista.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!motorista) {
            res.status(404).json({ success: false, msg: 'motorista não encontrado' });
        } else {
            res.status(200).json(motorista);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/motorista/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const motoristas = await prisma.motorista.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
        res.status(200).json(motoristas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/motorista', async (req, res) => {
    try {
        const { nome, cpf, nascimento, numero, email, foto_caminho } = req.body
        const motorista = await prisma.motorista.create({
            data: {
                cpf,
                nome,
                nascimento: `${nascimento}T00:00:00.000Z`,
                numero,
                email,
                foto_caminho
            }
        });
        res.status(201).json(motorista);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.put('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, cpf, nascimento, numero, email, foto_caminho } = req.body
        const motorista = await prisma.motorista.update({
            where: {
                id: parseInt(id)
            },
            data: {
                cpf,
                nome,
                nascimento: `${nascimento}T00:00:00.000Z`,
                numero,
                email,
                foto_caminho
            }
        })
        res.status(200).json(motorista);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const motorista = await prisma.motorista.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'motorista deletado:', motorista })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// LINHA ------------------------------------------------------------------------------------------------
app.get('/linha', async (req, res) => {
    try {
        const linhas = await prisma.linha.findMany()
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const linha = await prisma.linha.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!linha) {
            res.status(404).json({ success: false, msg: 'linha não encontrado' });
        } else {
            res.status(200).json(linha);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/linha/busca/:localinicio', async (req, res) => {
    try {
        const { localinicio } = req.params;
        const linhas = await prisma.linha.findMany({
            where: {
                localinicio: {
                    contains: localinicio
                }
            }
        });
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/linha', async (req, res) => {
    try {
        const { inicio, fim, localinicio, localfim } = req.body
        const linha = await prisma.linha.create({
            data: {
                inicio: `2023-01-01T${inicio}:00.000Z`,
                fim: `2023-01-01T${fim}:00.000Z`,
                localinicio,
                localfim
            }
        });
        res.status(201).json(linha);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.put('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { inicio, fim, localinicio, localfim } = req.body
        const linha = await prisma.linha.update({
            where: {
                id: parseInt(id)
            },
            data: {
                inicio: `${inicio}.000Z`,
                fim: `${fim}.000Z`,
                localinicio,
                localfim
            }
        })
        res.status(200).json(linha);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const linha = await prisma.linha.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'linha deletada:', linha })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// usuario ------------------------------------------------------------------------------------------------
app.get('/usuario', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany()
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const passageiro = await prisma.usuario.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!passageiro) {
            res.status(404).json({ success: false, msg: 'passageiro não encontrado' });
        } else {
            res.status(200).json(passageiro);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/usuario/busca/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const usuarios = await prisma.usuario.findMany({
            where: {
                nome: {
                    contains: nome
                }
            }
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/usuario', async (req, res) => {
    try {
        const data = req.body
        const usuario = await prisma.usuario.create({
            data: data
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // CADASTRAR

app.patch('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const usuario = await prisma.usuario.update({
            where: {
                id: parseInt(id)
            },
            data: data
        })
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await prisma.usuario.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'usuario deletado:', usuario })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

// ONIBUS ------------------------------------------------------------------------------------------------
app.get('/onibus', async (req, res) => {
    try {
        const onibus = await prisma.onibus.findMany()
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // GERAL

app.get('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const onibus = await prisma.onibus.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!onibus) {
            res.status(404).json({ success: false, msg: 'onibus não encontrado' });
        } else {
            res.status(200).json(onibus);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // POR ID

app.get('/onibus/busca/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const onibus = await prisma.onibus.findMany({
            where: {
                placa: {
                    contains: placa
                }
            }
        });
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // LIKE

app.post('/onibus', async (req, res) => {
    try {
        const { placa } = req.body
        const onibus = await prisma.onibus.create({
            data: { placa }
        });
        res.status(201).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }


}); // CADASTRAR

app.patch('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { placa } = req.body
        const onibus = await prisma.onibus.update({
            where: {
                id: parseInt(id)
            },
            data: { placa }
        })
        res.status(200).json(onibus);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // EDITAR

app.delete('/onibus/:id', async (req, res) => {
    try {
        const { id } = req.params
        const onibus = await prisma.onibus.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ msg: 'onibus deletado:', onibus })
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor', error: error })
        console.log(error)
    }

}); // DELETAR

app.all('*', (req, res) => {
    res.status(501).json({ success: false, msg: 'Rota Não encontrada' });
})

// RODANDO SERVIDOR
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
});