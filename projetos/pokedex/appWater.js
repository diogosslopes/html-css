const fetchPokemonWater = () =>{
    const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(i=1;i<=150;i++){
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
     }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        
        const waterPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "water")
 
        return waterPokemons

    }).then((waterPokemons)=>{
        let ul = document.querySelector('.pokedexWater')
        for(i=0;i<waterPokemons.length;i++){
        ul.innerHTML += `<li class="card grass" onclick="select(${waterPokemons[i].id})">
            <img class = "card-image" src="${waterPokemons[i].sprites.front_default}" alt="${waterPokemons[i].name}">
            <h2 class="card-title"> ${waterPokemons[i].name} </h2>
            
        </li>`}

        

    })
}

let waterFavorites = []
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
        if(waterFavorites.length <3){
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
            waterFavorites.push(pokemonSelected)       
        }else{
        window.alert("Maximo de 3 pokemons atingidos")
    }
        console.log(waterFavorites)

    }).then(()=>{
        let ulFavorites = document.querySelector('.waterFavorites')
        ulFavorites.innerHTML = ""
        waterFavorites.forEach((waterFavorites, index)=>{
                ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
                <img class = "card-image" src="${waterFavorites.picture}" alt="${waterFavorites.name}">
                <h2 class="card-title"> ${waterFavorites.name} </h2>
                </li>`
                    
        })

    
    })
       


}

function remove(index){

    console.log('cliquei no: ' + index)

    waterFavorites.splice(index,1)
    
    let ulFavorites = document.querySelector('.waterFavorites')
    ulFavorites.innerHTML = ""
    console.log(waterFavorites)
    waterFavorites.forEach((waterFavorites, index)=>{
        ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
        <img class = "card-image" src="${waterFavorites.picture}" alt="${waterFavorites.name}">
        <h2 class="card-title"> ${waterFavorites.name} </h2>
        </li>` 
        })

    }


function next(){        
    
    if(waterFavorites.length == 3){
        waterFavorites.forEach((waterFavorites)=>{
            pokemonsFavorites.push(waterFavorites)
        })
        localStorage.setItem("pokemonsFavorites", JSON.stringify(pokemonsFavorites))
        window.location = "favorites.html"
    }else{
        window.alert('Escolha 3 pokemons')
    }
    
}

    



fetchPokemonWater()