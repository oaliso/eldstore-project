const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express()
const port = 3000

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
})

connection.connect((err) =>{
    if(err){
        console.log("Erro ao conectar ao Banco de Dados")
        

        return
    }else{
        console.log("Sucesso ao conectar ao Banco de Dados");
        
    }
})

app.use(express.json());

app.use(cors())

app.get('/produto', (req, res) =>{
    connection.query(`SELECT * FROM Artifact`, (err, results) =>{
        if(err){
            res.sendStatus(500).json({ error: err })
        }else{
            res.json(results)
        }
    });
});

app.get('/produto/:BARCODE', (req, res) => {
    const { BARCODE } = req.params
    connection.query(`SELECT * FROM Artifact WHERE BARCODE = ?`, [BARCODE], (err, results) =>{
        if(err){
            res.sendStatus(500).json({ error: err })
        }else{
            res.json(results)
        }
    })
})

app.post('/produto', (req, res) =>{
    const { BARCODE, NAME, AMOUNT, CHECKSTOCK } = req.body
    connection.query(`INSERT INTO Artifact VALUES (?, ?, ?, ?, NOW())`, [BARCODE, NAME,  AMOUNT, CHECKSTOCK], (err, results) =>{
        if(err){
            res.sendStatus(500).json({ error: err })
            console.log(CHECKSTOCK);
            

        }else{
            res.json(results)
        }
    });
});

app.put('/produto/:BARCODE_ID', (req, res) =>{

    const { BARCODE, NAME, AMOUNT } = req.body
    const { BARCODE_ID } = req.params
    connection.query(`UPDATE Artifact SET BARCODE = ?, NAME = ?, AMOUNT = ? WHERE BARCODE = ?`, [BARCODE, NAME, AMOUNT, BARCODE_ID], (err, results) =>{
        if(err){
            res.sendStatus(500).json({ error: err })
        }else{
            res.json(results)
        }
    
    });
});

app.delete('/produto/:BARCODE', (req, res) =>{
    const { BARCODE } = req.params
    connection.query(`DELETE FROM Artifact WHERE BARCODE = ?`, [BARCODE], (err, results) =>{
        if(err){
            res.sendStatusStatus(500).json({ error: err })
        }else{
            res.json(results)
        }
    });
});

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})












// const mysql = require('mysql2')
// const express = require('express')

// const app = express();
// const port = 3001;

// const connection = mysql.createConnection({
//     host: '34.41.82.235',
//     user: 'estoeld',
//     password: 'estoeld',
//     database: 'estoeld_bd'
// })

// connection.connect((erro) => {
//     if(erro){
//         console.error("Erro ao conectar ao banco de dados", erro)

//         return

//     }else{
//         console.log("Banco de dados conectado");
        
//     }
// })

// app.get('/dados', (req, res) =>{
//     connection.query(`SELECT * FROM Artifact`, (erro, results) =>{
//         if(erro){
//             res.status(500).json({error: erro})
//         }else{
//             res.json(results);
//         }
//     })
// })


// app.listen(port, ()=>{
//     console.log(`Servidor rodando em http://localhost:${port}`);
// })

