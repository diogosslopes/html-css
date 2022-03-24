
const fetchPokemonFire = () =>{
    const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(i=1;i<=150;i++){
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
     }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        const firePokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "fire")
 
        return firePokemons

    }).then((firePokemons)=>{
        let ul = document.querySelector('.pokedexFire')
        for(i=0;i<firePokemons.length;i++){
        ul.innerHTML += `<li class="card grass" onclick="select(${firePokemons[i].id})">
            <img class = "card-image" src="${firePokemons[i].sprites.front_default}" alt="${firePokemons[i].name}">
            <h2 class="card-title"> ${firePokemons[i].name} </h2>
            
        </li>`}

        

    })
}

let fireFavorites = []
let pokemonSelected =  {
    id: "",
    name: "",
    type: "",
    picture: "",
    pokemonabilities: []
}

let pokemonsFavorites = JSON.parse(localStorage.getItem("pokemonsFavorites"))

if(pokemonsFavorites == null){
    localStorage.setItem("pokemonsFavorites", "[]")
    pokemonsFavorites = []
}

function select(index){
    
    let url = `https://pokeapi.co/api/v2/pokemon/${index}`
 
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        if(fireFavorites.length <3){
            let abilities = []
            for(cont=0;cont< data.abilities.length;cont++){
             
                ability = {
                    abilityname: data.abilities[cont].ability.name,
                    abilityurl: data.abilities[cont].ability.url,
                }
                abilities.push(ability)
            }
           
            pokemonSelected =  {
                id: data.id,
                name: data.name,
                type: data.types[0].type.name,
                picture: data.sprites.front_default,
                pokemonabilities: abilities
            }
            fireFavorites.push(pokemonSelected) 
        }else{
            window.alert("Maximo de 3 pokemons atingidos")
    }
        console.log(fireFavorites)
    }).then(()=>{
        let ulFavorites = document.querySelector('.fireFavorites')
        ulFavorites.innerHTML = ""
        fireFavorites.forEach((fireFavorites, index)=>{
            ulFavorites.innerHTML += `<li class="card fire" onclick="remove(${index})">
            <img class = "card-image" src="${fireFavorites.picture}" alt="${fireFavorites.name}">
            <h2 class="card-title"> ${fireFavorites.name} </h2>
            </li>` 
        })
    })
}

function remove(index){
  
    fireFavorites.splice(index,1)
  
    let ulFavorites = document.querySelector('.fireFavorites')
    ulFavorites.innerHTML = ""
    
    fireFavorites.forEach((fireFavorites, index)=>{
        ulFavorites.innerHTML += `<li class="card fire" onclick="remove(${index})">
        <img class = "card-image" src="${fireFavorites.picture}" alt="${fireFavorites.name}">
        <h2 class="card-title"> ${fireFavorites.name} </h2>
        </li>` 
    })

    }

    function next(){

        if(fireFavorites.length == 3){
            fireFavorites.forEach((fireFavorites)=>{
            pokemonsFavorites.push(fireFavorites)
        })
       
        localStorage.setItem("pokemonsFavorites", JSON.stringify(pokemonsFavorites))
        window.location = 'waterpokemons.html'
        }else{
            window.alert('Escolha 3 pokemons')
        }
        
    }


function search(){
    
}
    
fetchPokemonFire()