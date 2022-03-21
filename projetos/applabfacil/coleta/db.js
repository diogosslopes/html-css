const Sequelize = require('sequelize')
const sequelize = new Sequelize("heroku_edf71a843149fc9","b87f76c1ea3e36","0031d503",
{
    host: "us-cdbr-east-05.cleardb.net",
    dialect: 'mysql'
})

module.exports = sequelize

// const sequelize = new Sequelize("dcv6mpc43edttc","dzguxsmhbhkfng","4a9449edb70593bd98e5dc7dc0fcbfb34dbc1ce80eb9543373ca2dedb6c4a7b2",
// {
//     host: "ec2-34-206-148-196.compute-1.amazonaws.com",
//     dialect: 'postgresql'
// })

// sequelize.authenticate().then(function(){
//     console.log("Conectado com sucesso !")
// }).catch(function(erro){
//         console.log("falha" + erro)
//     })
