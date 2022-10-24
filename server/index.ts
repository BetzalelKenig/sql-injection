import express from 'express';
import * as sql from 'mssql';
// Todo refactor the server and make routes for different cases.
// Todo move DB seed to script through Dockerfile
const sqlConfig = {
    user: 'SA',
    password: 'b37z7yyl!',
    database: 'master',
    server: 'sql.db',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
class App {
    public async run() {
        const app = express()
        const port = 3322
        try {
            let isExist = await this.runQuery(`SELECT * FROM information_schema.tables
                WHERE table_name = 'tUsers'`);
            if (!isExist) {
                await this.runQuery(`
                CREATE TABLE tUsers (
                    id int identity primary key,
                    firstName varchar(1000) not null,
                    lastName varchar(1000) not null,
                    email nvarchar(100) not null unique,
                    password nvarchar(100) not null
                );
                
                INSERT INTO tUsers(firstName, lastName, email, password)
                VALUES ('John', 'Doue', 'john@doue.com', 'secret'),
                ('Mike', 'Johnson', 'mike@johnson.com', '123'),
                ('Mery', 'Levy', 'mery@levy.com', 'qwer'),
                ('Sum', 'Mar', 'Sum@Mar.com', 'pass123');
            `);
            }

        } catch (error) {
            console.log(error);
        }

        app.get('/test', async (req, res) => {
            const queryResults = await this.runQuery(`
                select * from tUsers;
            `);
            return res.send((queryResults as any).recordset);
        });

        app.get('/myDetails',async (req, res) => {
            let pass = req.query.password;
            const queryResults = await this.runQuery(`
                select * from tUsers where password = '${pass}';
            `);
            return res.send((queryResults as any).recordset);
        });

        app.listen(port, () => {
            console.log(`Demo app listening on port ${port}`);
        });

    }

    async runQuery(query) {
        // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
        return sql.connect(sqlConfig).then((pool) => {
            let dbRes;
            try {
                dbRes = pool.query(query);
            } catch (error) {
                console.log(error);
            }
            return dbRes;
        })
    }
}


new App().run();
