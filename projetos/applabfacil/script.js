
let wellcome = document.querySelector('#wellcome')
let userLoged = JSON.parse(localStorage.getItem('logedUser'))
if(userLoged != null){
    wellcome.innerHTML = `Olá ${userLoged.name}, seja bem vindo !`
}