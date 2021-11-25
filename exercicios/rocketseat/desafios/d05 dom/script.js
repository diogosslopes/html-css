const button = document.getElementById('openModal')
const div = document.querySelector('.invisible')

button.onclick = function(){
    div.classList.remove('invisible')
}

document.addEventListener('keydown', function(event){
    if(event.key === 'Escape')
        {
        div.classList.add('invisible')
        }
})