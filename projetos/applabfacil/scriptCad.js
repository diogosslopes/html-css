let nameConfirm = document.querySelector('#newNameInput')
let labelNewName = document.querySelector('#labelNewName')
let loginConfirm = document.querySelector('#newLoginInput')
let labelNewLogin = document.querySelector('#labelNewLogin')
let passwordConfirm = document.querySelector('#newPasswordInput')
let labelNewPassword = document.querySelector('#labelNewPassword')
let confirmPasswordConfirm = document.querySelector('#newConfirmPasswordInput')
let labelNewConfirmPassword = document.querySelector('#labelNewConfirmPassword')
let btnCad = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


function createLogin(){

let passwords = []
let newLogin = document.getElementById('newLoginInput')
let newPassword = document.getElementById('newPasswordInput')
let nome = document.getElementById('newNameInput')

    if(newLogin.value == "" || newPassword.value == "" || nome.value == ""){
        window.alert("Todos os campos devem ser preenchidos")
    }else if(newPassword.length < 6){
        window.alert("A senha deve conter pelo menos 6 digitos")
    }else{
        
    const newUser = {
        name: nome.value,
        login: newLogin.value,
        password: newPassword.value
    }

    passwords = JSON.parse(localStorage.getItem('appPasswords'))

    if (passwords == null){
        localStorage.setItem('appPasswords', '[]')
        passwords = []
    }

    passwords.push(newUser)
    localStorage.setItem('appPasswords', JSON.stringify(passwords))
    window.alert('Senha cadastrada com sucesso !')
    
    }
    
    

}


btnCad.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#newPasswordInput')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
    let inputConfirmSenha = document.querySelector('#newConfirmPasswordInput')
    
    if(inputConfirmSenha.getAttribute('type') == 'password'){
      inputConfirmSenha.setAttribute('type', 'text')
    } else {
      inputConfirmSenha.setAttribute('type', 'password')
    }
  })

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