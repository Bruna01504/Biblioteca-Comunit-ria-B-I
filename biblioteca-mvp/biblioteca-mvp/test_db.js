const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.all("SELECT COUNT(*) as count FROM leitores", (err, rows) => {
        console.log("Leitores:", rows);
    });
    db.all("SELECT COUNT(*) as count FROM livros", (err, rows) => {
        console.log("Livros:", rows);
    });
    db.all("SELECT COUNT(*) as count FROM emprestimos", (err, rows) => {
        console.log("Empréstimos:", rows);
    });
});
db.close();
