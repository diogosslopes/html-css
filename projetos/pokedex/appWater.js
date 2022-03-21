// const fetchPokemon = () =>{
    
//     const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//     const pokemonPromises = []

//     for(i=1;i<=150;i++){
//         pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
//      }

//     Promise.all(pokemonPromises)
//     .then(pokemons => {
        
//         //const grassPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "grass")
//         const firePokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "fire")
//         // const waterPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "water")
 
//         return grassPokemons

//     }).then((grassPokemons)=>{
//         let ul = document.querySelector('.pokedexGrass')
        
        
//         for(i=0;i<grassPokemons.length;i++){
//         ul.innerHTML += `<li class="card grass" onclick="select(${grassPokemons[i].id})">
//             <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassPokemons[i].id}.png" alt="${grassPokemons[i].name}">
//             <h2 class="card-title"> ${grassPokemons[i].name} </h2>
            
//         </li>`}

        
//     //    return function add(index){
//     //         console.log(index)
//     //         console.log(grassPokemons)
//     //     }
//         // console.log(grassPokemons)
//         // let div = document.querySelector('.container')
//         // div.innerHTML = `<p>nome:  ${grassPokemons[0].name}</p>`
//     })
// }

// const fetchPokemonFire = () =>{
//     const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//     const pokemonPromises = []

//     for(i=1;i<=150;i++){
//         pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
//      }

//     Promise.all(pokemonPromises)
//     .then(pokemons => {
        
//         const firePokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "fire")
//         // const waterPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "water")
 
//         return firePokemons

//     }).then((firePokemons)=>{
//         let ul = document.querySelector('.pokedexFire')
        
        
//         for(i=0;i<firePokemons.length;i++){
//         ul.innerHTML += `<li class="card grass" onclick="select(${firePokemons[i].id})">
//             <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firePokemons[i].id}.png" alt="${firePokemons[i].name}">
//             <h2 class="card-title"> ${firePokemons[i].name} </h2>
            
//         </li>`}

        

//     })
// }

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
            <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${waterPokemons[i].id}.png" alt="${waterPokemons[i].name}">
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
 

    //grassFavorites.push = (fetch(url).then(response => response.json()))
  
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        //console.log(data)
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
            pokemonsFavorites.push(pokemonSelected)           
        }else{
        window.alert("Maximo de 3 pokemons atingidos")
    }
        localStorage.setItem("pokemonsFavorites", JSON.stringify(pokemonsFavorites))
        console.log(waterFavorites)

    }).then(()=>{
        let ulFavorites = document.querySelector('.waterFavorites')
        ulFavorites.innerHTML = ""
        waterFavorites.forEach((waterFavorites, index)=>{
            ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
            <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${waterFavorites.id}.png" alt="${waterFavorites.name}">
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
        <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${waterFavorites.id}.png" alt="${waterFavorites.name}">
        <h2 class="card-title"> ${waterFavorites.name} </h2>
        </li>` 
        })

    }


function next(){
    let pokemonsFavorites = JSON.parse(localStorage.getItem("pokemonsFavorites"))

if(pokemonsFavorites == null){
    localStorage.setItem("pokemonsFavorites", "[]")
    pokemonsFavorites = []
}
    console.log(waterFavorites)
    console.log(pokemonsFavorites)
    localStorage.setItem("pokemonsFavorites", JSON.stringify(waterFavorites))
    window.location = "favorites.html"
}

    



fetchPokemonWater()