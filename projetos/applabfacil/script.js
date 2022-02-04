function login(){
    let login = document.getElementById('loginInput').value
    let password = document.getElementById('passwordInput').value
    let loginScreen = document.querySelector('.loginScreen')
    let h1 = document.querySelector('.desactive')
    var wellcome = document.querySelector('.wellcome')
    let errorMSG = document.querySelector('.errorMSG')
    let menu = document.querySelector('.menu')
    
    let listUsers = []

    let userValid = {
        name: "",
        login: "",
        password: ""
    }

    listUsers = JSON.parse(localStorage.getItem('appPasswords'))
    console.log(listUsers)

    if(listUsers != null){
        listUsers.forEach((item, index) => {
            if(login == item.login && password == item.password){
                userValid = {
                    name: listUsers[index].name,
                    login: login,
                    password: password
                }
                
            }
        })        
    }
        
    
    

    if(login == userValid.login && password == userValid.password && login != ''){
        
        

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('loginToken', token)

        localStorage.setItem('logedUser', JSON.stringify(userValid))

        loginScreen.classList.add('desactive')
        h1.classList.remove('desactive')
        menu.classList.remove('desactive')
        wellcome.innerHTML = `Olá ${userValid.name}, seja bem vindo !`
        
    }else{
        errorMSG.classList.remove('desactive')

    }


       
}

function createLogin(){
    var passwords = []
    var login = document.getElementById('newLoginInput').value
    var password = document.getElementById('newPasswordInput').value
    var name = document.getElementById('newNameInput').value
    let errorMSG = document.querySelector('.errorMSG')
    let loginScreen = document.querySelector('.loginScreen')
    
    
    if(login == "" || password == "" || name == ""){
        window.alert("Todos os campos devem ser preenchidos")
    }else if(password.length < 6){
        window.alert("A senha deve conter pelo menos 6 digitos")
    }else{
        
    let cadScreen = document.querySelector('.cadScreen')
    
    const newPassword = {
        name: name,
        login: login,
        password: password
    }

    passwords = JSON.parse(localStorage.getItem('appPasswords'))

    if (passwords == null){
        localStorage.setItem('appPasswords', '[]')
        passwords = []
    }

    passwords.push(newPassword)
    localStorage.setItem('appPasswords', JSON.stringify(passwords))
    window.alert('Senha cadastrada com sucesso !')
    cadScreen.classList.add('desactive')
    errorMSG.classList.add('desactive')
    
    
    }
    
    

}

function cancel(){
    let cadScreen = document.querySelector('.cadScreen')
    let errorMSG = document.querySelector('.errorMSG')
    cadScreen.classList.add('desactive')
    errorMSG.classList.add('desactive')
    let loginScreen = document.querySelector('.loginScreen')
    loginScreen.classList.remove('desactive')
    
}

function init(){
    let loginScreen = document.querySelector('.loginScreen')
    let h1 = document.querySelector('.desactive')
    let errorMSG = document.querySelector('.errorMSG')
    errorMSG.classList.add('desactive')
    


    let userLoged = localStorage.getItem('loginToken')
    if(userLoged != null){
        console.log(userLoged)
        loginScreen.classList.add('desactive')
        h1.classList.remove('desactive')
    }
    
    
}

function logout(){
    let loginScreen = document.querySelector('.loginScreen')
    let h1 = document.querySelector('.desactive')
    loginScreen.classList.remove('desactive')
    h1.classList.add('desactive')
    let menu = document.querySelector('.menu')
    menu.classList.remove('desactive')

    localStorage.removeItem('loginToken')
    localStorage.removeItem('logedUser')
}

function showCadScreen(){
    let cadScreen = document.querySelector('.cadScreen')
    cadScreen.classList.remove('desactive')
    let loginScreen = document.querySelector('.loginScreen')
    loginScreen.classList.add('desactive')
}

let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#passwordInput')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

init()