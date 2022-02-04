var senhas = [
    {
        login: "diogo.hotmail.com",
        senha: 1234
        
    },

    {
        login: "joao.hotmail.com",
        senha: 11654
        
    }
]

var senhasCriptografadas = []
var senhaCriptografada = {
    senha: ""
    
}

senhasCriptografadas.slice()
for(i=0; i< senhas.length; i++){

    logSenha = senhas[i].login + (senhas[i].senha * 351)
    console.log(logSenha)
    senhaCriptografada = {
        senha: logSenha 
    }
    
    console.log(senhaCriptografada)   
    senhasCriptografadas.push(senhaCriptografada)
    console.log(senhasCriptografadas)
    
}

var checkSenha = senhasCriptografadas.filter(senha => senha.senha === 'joao.hotmail.com4090554')

console.log(checkSenha)

if(checkSenha[0].senha != 'joao.hotmail.com4090554' ){
    console.log(false)
}else{
    console.log(true)
}