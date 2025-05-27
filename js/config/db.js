const sql = require('mssql');

const dbConfig ={
    user :'',
    password:'',
    server:'',
    database:'',
    encrypt: false,
    trustServerCertificate:true,
};
async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log('Conectado ao banco de dados com sucesso.');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

module.exports={connectDB,sql}