//criando elementos

const h2 = document.createElement('h2')
h2.innerText = 'Adicionando esse H2 a pagina'
const body = document.getElementById('body')

body.append(h2)
body.prepend(h2)
