const fetchPokemon = () =>{
    const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for(i=1;i<=150;i++){
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()))
     }

    Promise.all(pokemonPromises)
    .then(pokemons => {
        
        const grassPokemons = pokemons.filter((pokemons) => pokemons.types[0].type.name === "grass")
 
        return grassPokemons

    }).then((grassPokemons)=>{
        let ul = document.querySelector('.pokedexGrass')
        
        
        for(i=0;i<grassPokemons.length;i++){

           

        ul.innerHTML += `<li class="card grass"  onclick="select(${grassPokemons[i].id})" >
            <div class="card" onmouseenter="efeito(${grassPokemons[i].id})" onmouseleave="efeito(${grassPokemons[i].id})" >
            <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassPokemons[i].id}.png" alt="${grassPokemons[i].name}">
            <h2 class="card-title"> ${grassPokemons[i].name} </h2>
            </div>
            <div class="cardInfo" id = "G${grassPokemons[i].id}" >
            <p class="card-class">Tipo: ${grassPokemons[i].types[0].type.name} </p>
            <p class="card-ability" id= "P${grassPokemons[i].id}">Habilidades:<br> </p>
            
             </div>
            
        </li>`

       

            // let grassabilities = []
            // let grassability = {}
            for(cont=0;cont< grassPokemons[i].abilities.length;cont++){
          
                let pAbilities = document.querySelector(`#P${grassPokemons[i].id}`)

                pAbilities.innerHTML += `${cont + 1} - ${grassPokemons[i].abilities[cont].ability.name}<br>`
                
                // grassability = {
                //     pokemonid: grassPokemons[i].id,
                //     abilityname: grassPokemons[i].abilities[cont].ability.name,
                //     abilityurl: grassPokemons[i].abilities[cont].ability.url,
                // }
                // grassabilities.push(grassability)
                
            }
            
        // for(c=0;c<grassabilities.length;c++){
     

        //     let pAbilities = document.querySelector(`#P${grassPokemons[i].id}`)
        //     console.log(pAbilities)
        //     pAbilities.innerHTML += `<p class="card-ability">${c + 1} - ${grassabilities[c].abilityname}</p> `
        // }
    
        // grassabilities.forEach((grassabilities, index)=>{

        //     console.log(grassabilities.abilityname +" " + grassabilities.pokemonid)
        //     let pAbilities = document.querySelector(`#P${grassPokemons[i].id}`)

        //     pAbilities.innerHTML += `<p class="card-ability">${index + 1} - ${grassabilities.abilityname}</p> `
        // })


        
        
    }
        
        return grassPokemons
        
    }).then((grassPokemons)=>{
        function search(){
            let searchField = document.getElementById('search').value
            console.log(searchField)
            const searchPokemon = grassPokemons.filter((grass)=> {return grass.name.includes(searchField)} )
        
            console.log (searchPokemon)

            let ul = document.querySelector('.pokedexGrass')
            ul.innerHTML = ""
            searchPokemon.forEach((searchPokemon, index)=>{
                ul.innerHTML += `<li class="card grass" onclick="select(${index})">
                <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchPokemon.id}.png" alt="${searchPokemon.name}">
                <h2 class="card-title"> ${searchPokemon.name} </h2>
                </li>` 
                })
            }
            document.getElementById('search').addEventListener("keyup", search)
    })
}

let grassFavorites = []
let pokemonSelected =  {
    id: "",
    name: "",
    type: "",
    picture: "",
    pokemonabilities: []
}

let pokemonsFavorites = JSON.parse(localStorage.getItem("pokemonsFavorites"))


    localStorage.setItem("pokemonsFavorites", "[]")
    pokemonsFavorites = []


function select(index){

    let url = `https://pokeapi.co/api/v2/pokemon/${index}`
 
    fetch(url)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        

        if(grassFavorites.length <3){
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
            grassFavorites.push(pokemonSelected)   
            
        }else{
        window.alert("Maximo de 3 pokemons atingidos")
    }
        
        console.log(grassFavorites)

    }).then(()=>{
        let ulFavorites = document.querySelector('.favorites')
        ulFavorites.innerHTML = ""
        grassFavorites.forEach((grassFavorites, index)=>{
            ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
            <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassFavorites.id}.png" alt="${grassFavorites.name}">
            <h2 class="card-title"> ${grassFavorites.name} </h2>
            </li>`           
        })
    })
}

function remove(index){

    console.log('cliquei no: ' + index)

    grassFavorites.splice(index,1)
    
    let ulFavorites = document.querySelector('.favorites')
    ulFavorites.innerHTML = ""
    console.log(grassFavorites)
    grassFavorites.forEach((grassFavorites, index)=>{
        ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
        <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassFavorites.id}.png" alt="${grassFavorites.name}">
        <h2 class="card-title"> ${grassFavorites.name} </h2>
        </li>` 
        })

    }

function next(){
    if(grassFavorites.length == 3){
        grassFavorites.forEach((grassFavorites)=>{
            pokemonsFavorites.push(grassFavorites)
        })
       
        localStorage.setItem("pokemonsFavorites", JSON.stringify(pokemonsFavorites))
    }else{
        window.alert("Escolha 3 pokemons")
    }
    
}

    
// function search(){
//     let searchField = document.getElementById('search').innerHTML
//     console.log(searchField)
//     let searchPokemon = grassPokemons.filter((grass)=>{
//         grass.name === searchField
//     })

//     console.log (searchPokemon)

//     // grassFavorites.forEach((grassFavorites, index)=>{
//     //     ulFavorites.innerHTML += `<li class="card grass" onclick="remove(${index})">
//     //     <img class = "card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${grassFavorites.id}.png" alt="${grassFavorites.name}">
//     //     <h2 class="card-title"> ${grassFavorites.name} </h2>
//     //     </li>` 
//     //     })
//     }



fetchPokemon()


function efeito(id){
    let element = document.querySelector(`#G${id}`)

    if(element.classList[1] == "efeitoCardInfo"){
        element.classList.remove("efeitoCardInfo")
        console.log("Saiu")
    }else{
        element.classList.add("efeitoCardInfo")
        console.log("Entrou")
    }

}


