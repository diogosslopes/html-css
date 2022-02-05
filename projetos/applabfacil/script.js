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
    var name = document.getElementById('newNameInput')
    let errorMSG = document.querySelector('.errorMSG')
    let loginScreen = document.querySelector('.loginScreen')
    
    
    if(login == "" || password == "" || name.value == ""){
        window.alert("Todos os campos devem ser preenchidos")
    }else if(password.length < 6){
        window.alert("A senha deve conter pelo menos 6 digitos")
    }else{
        
    let cadScreen = document.querySelector('.cadScreen')
    
    const newPassword = {
        name: name.value,
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
    let loginScreen = document.querySelector('.loginScreen')
    loginScreen.classList.add('desactive')
    let cadScreen = document.querySelector('.cadScreen')
    cadScreen.classList.remove('desactive')

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


let nameConfirm = document.querySelector('#newNameInput')
let labelNewName = document.querySelector('#labelNewName')
let loginConfirm = document.querySelector('#newLoginInput')
let labelNewLogin = document.querySelector('#labelNewLogin')
let passwordConfirm = document.querySelector('#newPasswordInput')
let labelNewPassword = document.querySelector('#labelNewPassword')
let confirmPasswordConfirm = document.querySelector('#newConfirmPasswordInput')
let labelNewConfirmPassword = document.querySelector('#labelNewConfirmPassword')

nameConfirm.addEventListener('keyup', ()=> {
    if(nameConfirm.value.length < 3){
        labelNewName.setAttribute('style', 'color: red')
        labelNewName.innerHTML = 'Nome *Digite 3 ou mais caracteres'
        nameConfirm.setAttribute('style', 'border-color: red')
    }else{
        labelNewName.setAttribute('style', 'color: green')
        labelNewName.innerHTML = 'Nome'
        nameConfirm.setAttribute('style', 'border-color: green')
    }
})


loginConfirm.addEventListener('keyup', ()=> {
    if(loginConfirm.value.length < 6){
        labelNewLogin.setAttribute('style', 'color: red')
        labelNewLogin.innerHTML = 'Usuario *Digite 6 ou mais caracteres'
        loginConfirm.setAttribute('style', 'border-color: red')
    }else{
        labelNewLogin.setAttribute('style', 'color: green')
        labelNewLogin.innerHTML = 'Usuario'
        loginConfirm.setAttribute('style', 'border-color: green')
    }
})

passwordConfirm.addEventListener('keyup', ()=> {
    if(passwordConfirm.value.length < 6){
        labelNewPassword.setAttribute('style', 'color: red')
        labelNewPassword.innerHTML = 'Senha *A senha deve conter 6 ou mais caracteres'
        passwordConfirm.setAttribute('style', 'border-color: red')
    }else{
        labelNewPassword.setAttribute('style', 'color: green')
        labelNewPassword.innerHTML = 'Senha'
        passwordConfirm.setAttribute('style', 'border-color: green')
    }
})

confirmPasswordConfirm.addEventListener('keyup', ()=> {
    if(confirmPasswordConfirm.value != passwordConfirm.value){
        labelNewConfirmPassword.setAttribute('style', 'color: red')
        labelNewConfirmPassword.innerHTML = 'Confirmar Senha *Senhas não conferem'
        confirmPasswordConfirm.setAttribute('style', 'border-color: red')
    }else{
        labelNewConfirmPassword.setAttribute('style', 'color: green')
        labelNewConfirmPassword.innerHTML = 'Confirmar Senha'
        confirmPasswordConfirm.setAttribute('style', 'border-color: green')
    }
})


init()