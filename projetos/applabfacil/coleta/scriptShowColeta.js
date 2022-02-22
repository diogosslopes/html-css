var cadColeta = []
var coletasCadastradas =[]
const chaveAPI = 'AIzaSyCP785Haf0HZcwES00qa3vf6x_qTNiK0fA'



function showColetas(){
    coletasCadastradas = JSON.parse(localStorage.dadosColeta)
    return coletasCadastradas
}

showColetas()

function addHTMLCard(coletasCadastradas, index){
    newColetas = coletasCadastradas
    
    let html = ""
    var divCard = document.getElementById('cardsColeta')
         
         html =  `<div class="cardColeta">
                         <div id="nameCard">
                             <label for="">Nome:</label> <label for="">${newColetas.name}</label>
                         </div>
     
                         <div>
                             <label for="">Data:</label> <label for="" id="dateCard">${newColetas.date}</label> <label for="">Hora:</label> <label for="" id="timeCard">${newColetas.time}</label>
                         </div>
     
                         <div>
                             <label for="">Endereço:</label> <label for="" id="endCard">${newColetas.end}</label> <label for="">Nº:</label> <label for="" id="numberCard">${newColetas.number}</label>
                         </div>
     
                         <div>
                             <label for="">Bairro:</label> <label for="" id="bairroCard">${newColetas.bairro}</label>
                         </div>
     
                         <div>
                             <label for="">Cidade:</label> <label for="" id="cityCard">${newColetas.city}</label>
                         </div>
     
                         <div>
                             <label for="">Referencia: </label> <label for="" id="compCard">${newColetas.reference}</label> 
                         </div>
                         <div id="divImg">
                         <img onclick="remove(${index})" src="../imagens/minus25x25.png" alt="Remover Coleta">
                         <img onclick="edit(${index})" src="../imagens/editar25x25.png" alt="Editar Coleta">
                         <img onclick="confirm(${index})" src="../imagens/verificado25x25.png" alt="Confirmar Coleta">
                         <img onclick="map(${index})" src="../imagens/placeholder25x25.png" alt="Abri Mapa">
                         </div>
                         
                     </div>`
        divCard.innerHTML += html
         
     

}

function init(){

coletasCadastradas.forEach((coletasCadastradas, index)=>{
    addHTMLCard(coletasCadastradas, index)

})
}

function reload(){
    var divCard = document.getElementById('cardsColeta')
    divCard.innerHTML = ""
    init()
}

function remove(index){
    coletasCadastradas.splice(index,1)
    localStorage.setItem("dadosColeta", JSON.stringify(coletasCadastradas))    
    reload()
}

function confirm(index){

    let confirmedColeta = JSON.parse(localStorage.getItem("coletasRealizadas"))

    if(confirmedColeta == null){
        localStorage.setItem("coletasRealizadas", "[]")
        confirmedColeta = []
    }

    var confirmColeta = JSON.parse(localStorage.dadosColeta)[index]
    confirmedColeta.push(confirmColeta)
    console.log(confirmColeta)
    console.log(confirmedColeta)
    

    localStorage.setItem("coletasRealizadas", JSON.stringify(confirmedColeta))

    remove(index)

    }

function edit(index){
    let editColeta = JSON.parse(localStorage.dadosColeta)[index]
    let editClass = document.querySelector('.editModal')
    let showBtn = document.querySelector('.btnModal')
    let editBtns = document.querySelector('.formsbtn')
    showBtn.classList.add('active')
    editBtns.classList.remove('btnVoltar')
    editClass.classList.add('active')
    console.log(editColeta.end)

    document.getElementById('date').value = editColeta.date
    document.getElementById('time').value = editColeta.time
    document.getElementById('name').value = editColeta.name
    document.getElementById('cpf').value = editColeta.cpf
    document.getElementById('cep').value = editColeta.cep
    document.getElementById('end').value = editColeta.end
    document.getElementById('city').value = editColeta.city
    document.getElementById('birth').value = editColeta.birth
    document.getElementById('phone').value = editColeta.phone
    document.getElementById('number').value = editColeta.number
    document.getElementById('bairro').value = editColeta.bairro
    document.getElementById('reference').value = editColeta.reference
    document.getElementById('vExames').value = editColeta.vExames
    document.getElementById('vTaxa').value = editColeta.vTaxa
    document.getElementById('vTotal').value = editColeta.vTotal
    document.getElementById('obs').value = editColeta.obs
    document.getElementById('index').value = index
    
    

    
}

function saveEdit(editIndex){
    let editClass = document.querySelector('.editModal')
    let showBtn = document.querySelector('.btnModal')
    let editBtns = document.querySelector('.formsbtn')
    showBtn.classList.remove('active')
    editBtns.classList.add('btnVoltar')
    editClass.classList.remove('active')

   const editedColeta = {
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    name: document.getElementById('name').value ,
    cpf: document.getElementById('cpf').value ,
    cep: document.getElementById('cep').value ,
    end: document.getElementById('end').value ,
    city: document.getElementById('city').value ,
    birth: document.getElementById('birth').value ,
    phone: document.getElementById('phone').value ,
    number: document.getElementById('number').value ,
    bairro: document.getElementById('bairro').value ,
    reference: document.getElementById('reference').value, 
    vExames: document.getElementById('vExames').value ,
    vTaxa: document.getElementById('vTaxa').value ,
    vTotal: document.getElementById('vTotal').value ,
    obs: document.getElementById('obs').value
    }
    const editedIndex = document.getElementById('index').value

    
    let newColeta = JSON.parse(localStorage.getItem("dadosColeta"))
    remove(editedIndex)
    coletasCadastradas.splice(index,0,editedColeta)
    localStorage.setItem("dadosColeta", JSON.stringify(coletasCadastradas))
    reload()

}

const editCep = async() =>{
    
    const url = `http://viacep.com.br/ws/${document.getElementById('cep').value}/json/`
    const dadosCep = await fetch(url)
    const endCompleto = await dadosCep.json()
    preencherForm(endCompleto)

}

function preencherForm(endCompleto){
    document.getElementById('end').value = endCompleto.logradouro
    document.getElementById('bairro').value = endCompleto.bairro
    document.getElementById('city').value = endCompleto.localidade
}

document.getElementById('cep').addEventListener('focusout', editCep)

function cancelEdit(){
    let editClass = document.querySelector('.editModal')
    let showBtn = document.querySelector('.btnModal')
    let editBtns = document.querySelector('.formsbtn')
    showBtn.classList.remove('active')
    editBtns.classList.add('btnVoltar')
    editClass.classList.remove('active')
}

function clearForm(){
    document.getElementById('date').value = ""
    document.getElementById('time').value = ""
    document.getElementById('name').value = ""
    document.getElementById('cpf').value = ""
    document.getElementById('cep').value = ""
    document.getElementById('end').value = ""
    document.getElementById('city').value = ""
    document.getElementById('birth').value = ""
    document.getElementById('phone').value = ""
    document.getElementById('number').value = ""
    document.getElementById('bairro').value = ""
    document.getElementById('reference').value = ""
    document.getElementById('vExames').value = ""
    document.getElementById('vTaxa').value = ""
    document.getElementById('vTotal').value = ""
    document.getElementById('obs').value = ""
    
}

function map(){
    let local = document.getElementById('endCard').innerHTML + " " + document.getElementById('numberCard').innerHTML + " " + document.getElementById('bairroCard').innerHTML + " " + document.getElementById('cityCard').innerHTML
    console.log(local)

    let localEdited = local.replace(/ /g,"+")
    console.log(localEdited)

    window.location.href = `https://www.google.com.br/maps/place/${localEdited}`
     
}

init()


