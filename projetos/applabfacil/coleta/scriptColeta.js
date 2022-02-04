// Adicionar coleta

var cadColeta = []
var coletasCadastradas =[]


var newDate = document.querySelector('input#date')
var newTime =  document.querySelector('input#time')
var newName =  document.querySelector('input#name')
var birth = document.querySelector('input#birth') 
var  newCPF = document.querySelector('input#cpf')
var  newPhone = document.querySelector('input#phone')
var  newCEP =  document.querySelector('input#cep')
var  newNumber = document.querySelector('input#number')
var  newEnd = document.querySelector('input#end')
var  newBairro = document.querySelector('input#bairro')
var  newCity = document.querySelector('input#city')
var  newReference = document.querySelector('input#reference')
var  newValExame = document.querySelector('input#vExames')
var  newValTaxa = document.querySelector('input#vTaxa')
var  newValTotal = document.querySelector('input#vTotal')
var  newPago = ""
var  newOBS = document.querySelector('textarea#obs')




function save(){
   


    let splittedDate = birth.value.split('-')
    let newBirth = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`

    const addColeta = {
        date: newDate.value,
        time: newTime.value,
        name: newName.value,
        birth: newBirth,
        cpf: newCPF.value,
        phone: newPhone.value,
        cep: newCEP.value,
        number: newNumber.value,
        end: newEnd.value,
        bairro: newBairro.value,
        city: newCity.value,
        reference: newReference.value,
        vExame: newValExame.value,
        vTaxa: newValTaxa.value,
        vTotal: newValTotal.value,
        pago: newPago,
        obs: newOBS.value,
        
    }

    let newColeta = JSON.parse(localStorage.getItem("dadosColeta"))

    if(newColeta == null){
        localStorage.setItem("dadosColeta", "[]")
        newColeta = []
    }

    newColeta.push(addColeta)
    cadColeta.push(addColeta)

    localStorage.setItem("dadosColeta", JSON.stringify(newColeta))


    
    
    
    
    clearForm()

}

function clearForm(){
    newDate.value = ""
    newTime.value = ""
    newName.value = ""
    birth.value = ""
    newCPF.value = ""
    newPhone.value = ""
    newCEP.value = ""
    newNumber.value = ""
    newEnd.value = ""
    newBairro.value = ""
    newCity.value = ""
    newReference.value = ""
    newValExame.value = ""
    newValTaxa.value = ""
    newDate.value = ""
    newOBS.value = ""
}

const pesquisaCep = async() =>{
    const url = `http://viacep.com.br/ws/${newCEP.value}/json/`
    const dadosCep = await fetch(url)
    const endCompleto = await dadosCep.json()
    preencherForm(endCompleto)

}

function preencherForm(endCompleto){
    document.getElementById('end').value = endCompleto.logradouro
    document.getElementById('bairro').value = endCompleto.bairro
    document.getElementById('city').value = endCompleto.localidade
}

document.getElementById('cep').addEventListener('focusout', pesquisaCep)

function login(){
    console.log("Logado")
}









