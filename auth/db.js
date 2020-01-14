const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'linaina13',
    database: 'nodedb'
})

connection.connect(err => {
    if (err) throw err
    console.log("Connected!")
    const createTableUsers = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        login varchar(50) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        email varchar(100) NOT NULL
      ) ENGINE=InnoDB;
      `
    connection.query(createTableUsers, ((err, result) => {
        if (err) {
            console.log("error")
            throw err
        }
        console.log("done")
    }))
    connection.query(`INSERT INTO users (login, \`password\`, email) VALUES ('test',  'test',  'test@test.com');`, ((err, result) => {
        if (err) {
            console.log("error")
            throw err
        }
        console.log("insert done")
    }))
})



module.exports = connection