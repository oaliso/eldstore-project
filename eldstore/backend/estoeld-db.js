const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
});

connection.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao Banco de Dados");
        return;
    }
    console.log("Sucesso ao conectar ao Banco de Dados");
});

app.use(express.json());
app.use(cors());

app.get('/produto', (req, res) => {
    connection.query(`SELECT * FROM Artifact`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.get('/produto/count', (req, res) => {
    connection.query(`SELECT COUNT(*) AS counter FROM Artifact`, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results[0]);
    });
});

app.get('/produto/counter', (req, res) => {
    const CHECKSTOCK = req.query.checkstock;
    
    connection.query(`SELECT COUNT(*) AS counter FROM Artifact WHERE CHECKSTOCK = ?`, [CHECKSTOCK], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results[0]);
    });
});

app.get('/produto/:BARCODE', (req, res) => {
    const { BARCODE } = req.params;
    
    connection.query(`SELECT * FROM Artifact WHERE BARCODE = ?`, [BARCODE], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.post('/produto', (req, res) => {
    const { BARCODE, NAME, AMOUNT, CHECKSTOCK } = req.body;
    
    connection.query(`INSERT INTO Artifact VALUES (?, ?, ?, ?, NOW())`, [BARCODE, NAME, AMOUNT, CHECKSTOCK], (err, results) => {
        if (err) {
            console.error("Erro ao inserir produto:", err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.put('/produto/:BARCODE_ID', (req, res) => {
    const { NAME, AMOUNT } = req.body;
    const { BARCODE_ID } = req.params;
    
    connection.query(`UPDATE Artifact SET NAME = ?, AMOUNT = ? WHERE BARCODE = ?`, [NAME, AMOUNT, BARCODE_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.delete('/produto/:BARCODE', (req, res) => {
    const { BARCODE } = req.params;
    
    connection.query(`DELETE FROM Artifact WHERE BARCODE = ?`, [BARCODE], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
