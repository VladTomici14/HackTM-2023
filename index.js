const {Client} = require("pg")

const client = new Client({
    host: "localhost",
    user: "vladt",
    port: 5432,
    password: "lescovita14",
    database: "vladt"
})

client.connect()

pullFromServer("user")
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