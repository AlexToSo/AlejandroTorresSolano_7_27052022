const mysql = require('mysql2/promise');

mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
})
    .then((connection) => {
        console.log('Connection to mySQL successful!')
        global.mysql = connection;
    }
    )
    .catch(() => console.log('Connection to mySQL unsuccessful!'));