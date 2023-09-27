const express = require('express');
const mysql = require('mysql2/promise');
const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

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
        const [query] = await connection.execute('select * from passageiro');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }
}); // GERAL

app.get('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from passageiro where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }
}); // POR ID

app.get('/passageiro/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from passageiro where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }
}); // LIKE

app.post('/passageiro', async (req, res) => {
    try {
        const { nome, email } = req.body
        const [query] = await connection.execute('insert into passageiro (nome, email) values (?,?)', [nome, email]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }
}); // CADASTRAR

app.put('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body
        const [query] = await connection.execute('update passageiro set nome = ?, email = ? where id = ?', [nome, email, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // EDITAR

app.delete('/passageiro/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from passageiro where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // DELETAR

// MOTORISTA ------------------------------------------------------------------------------------------------
app.get('/motorista', async (req, res) => {
    try {
        const [query] = await connection.execute('select * from motorista');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }
}); // GERAL

app.get('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from motorista where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // POR ID

app.get('/motorista/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from motorista where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // LIKE

app.post('/motorista', async (req, res) => {
    try {
        const { nome, email } = req.body
        const [query] = await connection.execute('insert into motorista (nome, email) values (?,?)', [nome, email]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // CADASTRAR

app.put('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body
        const [query] = await connection.execute('update motorista set nome = ?, email = ? where id = ?', [nome, email, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // EDITAR

app.delete('/motorista/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from motorista where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // DELETAR

// LINHA ------------------------------------------------------------------------------------------------
app.get('/linha', async (req, res) => {
    try {
        const [query] = await connection.execute('select * from linha');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // GERAL

app.get('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from linha where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // POR ID

app.get('/linha/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from linha where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // LIKE

app.post('/linha', async (req, res) => {
    try {
        const { nome, email } = req.body
        const [query] = await connection.execute('insert into linha (nome, email) values (?,?)', [nome, email]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // CADASTRAR

app.put('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body
        const [query] = await connection.execute('update linha set nome = ?, email = ? where id = ?', [nome, email, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // EDITAR

app.delete('/linha/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from linha where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // DELETAR

// usuario ------------------------------------------------------------------------------------------------
app.get('/usuario', async (req, res) => {
    try {
        const [query] = await connection.execute('select * from usuario');
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // GERAL

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute('select * from usuario where id = ?', [id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // POR ID

app.get('/usuario/busca/:nomex', async (req, res) => {
    try {
        const { nomex } = req.params;
        const nome = '%' + nomex + '%';
        const [query] = await connection.execute('select * from usuario where nome like ?', [nome]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // LIKE

app.post('/usuario', async (req, res) => {
    try {
        const { nome, email } = req.body
        const [query] = await connection.execute('insert into usuario (nome, email) values (?,?)', [nome, email]);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // CADASTRAR

app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, email } = req.body
        const [query] = await connection.execute('update usuario set nome = ?, email = ? where id = ?', [nome, email, id]);
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // EDITAR

app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [query] = await connection.execute("delete from usuario where id  = ?", [id])
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Ocorreu Um Erro no Servidor' })
    }

}); // DELETAR

// RODANDO SERVIDOR
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
});