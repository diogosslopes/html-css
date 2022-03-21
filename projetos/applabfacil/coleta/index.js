(async () =>{

    const database = require('./db')
    await database.sync()


})()

const coleta = database.