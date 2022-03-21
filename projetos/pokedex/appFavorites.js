let pokemonsFavorites = JSON.parse(localStorage.getItem("pokemonsFavorites"))

if(pokemonsFavorites == null){
    localStorage.setItem("pokemonsFavorites", "[]")
    pokemonsFavorites = []
}

console.log(pokemonsFavorites)


let ulGrasss = document.querySelector('.pokedexGrass')
let ulFire = document.querySelector('.pokedexFire')
let ulWater = document.querySelector('.pokedexWater')
ulGrasss.innerHTML = ""
ulFire.innerHTML = ""
ulWater.innerHTML = ""
        pokemonsFavorites.forEach((pokemonsFavorites, index)=>{
            if(pokemonsFavorites.type == "grass"){
                ulGrasss.innerHTML += `<li class="card grass" onclick="remove(${index})">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsFavorites.id}.png" alt="${pokemonsFavorites.name}">
                <h2 class="card-title"> ${pokemonsFavorites.name} </h2>
                </li>` 
            }else if(pokemonsFavorites.type == "fire"){
                ulFire.innerHTML += `<li class="card fire" onclick="remove(${index})">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsFavorites.id}.png" alt="${pokemonsFavorites.name}">
                <h2 class="card-title"> ${pokemonsFavorites.name} </h2>
                </li>`
            }else{
                ulWater.innerHTML += `<li class="card water" onclick="remove(${index})">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonsFavorites.id}.png" alt="${pokemonsFavorites.name}">
                <h2 class="card-title"> ${pokemonsFavorites.name} </h2>
                </li>`
            }
        })