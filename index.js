const {Client} = require("pg")

const client = new Client({
    host: "localhost",
    user: "vladt",
    port: 5432,
    password: "garland4",
    database: "Users"
})

client.query('SELECT * FROM "users"', (err, res) => {
    if (err) {
        console.error("Error executing query", err)
        return
    }
    console.log("Querry results: ", results.rows)
})

client.connect()


// -------- pulling data from the db -------
// pullFromServer("user")
function pullFromServer(table) {
    client.query(`SELECT * public.`+table, (err, res) => {
        if (!err) {
            console.log(res.rows)
        } else {
            console.log("error occured: " + err.message)
        }
        client.end();
    })
}