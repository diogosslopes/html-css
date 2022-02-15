


function login(){

var login = document.getElementById('loginInput').value
let password = document.getElementById('passwordInput').value
let errorMSG = document.querySelector('.errorMSG')
    
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
        
       window.location.href = 'telainicial.html'
       
       let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
       localStorage.setItem('loginToken', token)
       localStorage.setItem('logedUser', JSON.stringify(userValid))

        
         
        
    }else{
        errorMSG.classList.remove('desactive')

    }

}

function logout(){


    localStorage.removeItem('loginToken')
    localStorage.removeItem('logedUser')
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




