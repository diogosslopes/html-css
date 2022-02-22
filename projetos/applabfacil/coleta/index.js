const Client = require('pg').Client
const cliente = new Client({
    user: "dzguxsmhbhkfng",
    password: "4a9449edb70593bd98e5dc7dc0fcbfb34dbc1ce80eb9543373ca2dedb6c4a7b2",
    host: "ec2-34-206-148-196.compute-1.amazonaws.com",
    port: "5432",
    database: "dcv6mpc43edttc"
})

cliente.connect()
cliente.query("select * from cad_coleta").then(results => {
    const resultado = results.rows
    console.log(resultado)
})