    let pokemonName = document.getElementById("namePokemon")
    let pokemonPicture = document.getElementById("picturePokemon")
    let pokemonType = document.getElementById("divType")
    let pokemon_number = 150
    let listPokemons = []
    let pokemonGrass = []
    let pokemonFire = []
    let pokemonWater = []
    var addPokemon = {
        id: "",
        name: "",
        type: "",
        pic: "",
    }


        

    // function pokemon(){

//     const produtos = [
//         {id: 1, name: 'bulbasaur', type: 'grass', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'},
//         {id: 2, name: 'ivysaur', type: 'grass', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'},
//        {id: 3, name: 'venusaur', type: 'grass', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'},
//        {id: 4, name: 'charmander', type: 'fire', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'},
//          {id: 5, name: 'charmeleon', type: 'fire', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'},
//          {id: 6, name: 'charizard', type: 'fire', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'},
//          {id: 7, name: 'squirtle', type: 'water', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'},
//          {id: 8, name: 'wartortle', type: 'water', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'},
//          {id: 9, name: 'blastoise', type: 'water', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'},
//          {id: 10, name: 'caterpie', type: 'bug', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png'},
//          {id: 11, name: 'metapod', type: 'bug', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'},
//          {id: 12, name: 'butterfree', type: 'bug', pic: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png'}
//     ]
    
//     console.log (produtos)
    
//     let alimentos = produtos.filter( p => p.type === 'grass')
    
//     console.log (alimentos)

// }

// pokemon()





for(i=1;i<=150;i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
        fetch(url)
        .then((response) => {
            return response.json()
            
        })
        .then((data) =>{
        
       // console.log(data)
        
        addPokemon = {
            id: data.id,
            name: data.name,
            type: data.types[0].type.name,
            pic: data.sprites.front_default,
        }
        //console.log(i)
        listPokemons.push(addPokemon)
        if(addPokemon.type === 'grass'){
            pokemonGrass.push(addPokemon)
        }else if(addPokemon.type === 'fire'){
            pokemonFire.push(addPokemon)
        }else if(addPokemon.type === 'water'){
            pokemonWater.push(addPokemon)
        }
       
          
    })
        
            
        
}

// pokemonName.innerHTML = pokemonGrass[0]
// pokemonPicture.setAttribute('src', pokemonGrass.pic )
//pokemonType.innerHTML += `<p>${pokemonGrass.type}</p>`



console.log(listPokemons)
console.log(pokemonGrass)
console.log(pokemonFire)
console.log(pokemonWater)
    
//emissões atoacusticas