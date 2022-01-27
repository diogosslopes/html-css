var cadColeta = []
var coletasCadastradas =[]


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


init()


