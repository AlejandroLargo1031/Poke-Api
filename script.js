async function buscarPokemonNombre() {
  const pokemon = document.getElementById("pokemonInput").value;
  if (pokemon === "") {
    alert("Por favor, introduce un nombre de Pokémon");
    return;
  }
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    const pokemonContainer = document.getElementById("pokemon");

    pokemonContainer.style.display = "flex";

    pokemonContainer.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
  } catch (error) {
    console.error("Error:", error);
    
    const pokemonContainer =document.getElementById("pokemon");

    pokemonContainer.innerHTML = ''; 

    pokemonContainer.style.display = "flex";

    pokemonContainer.innerHTML = `
            <h2>Error al buscar el Pokémon</h2>
            <p>Por favor, verifica que el nombre sea correcto y vuelve a intentarlo.</p>
        `;
  }
}

async function buscarPokemonHabilidad() {
    const habilidad = document.getElementById('pokemonInput').value.toLowerCase();
    const API_URL = `https://pokeapi.co/api/v2/ability/${habilidad}`;
  
    try {
      const response = await fetch(API_URL); 
      if (!response.ok) throw new Error('Habilidad no encontrada');
      
      const data = await response.json();
      const pokemonList = data.pokemon.map(p => p.pokemon);
      mostrarPokemones(pokemonList);
  
    } catch (error) {
      console.error('Hubo un problema:', error);
    }
  }

async function buscarPokemonTipo() {
    const tipo = document.getElementById('pokemonInput').value.toLowerCase();
    const API_URL = `https://pokeapi.co/api/v2/type/${tipo}`;
  
    try {
      const response = await fetch(API_URL); 
      if (!response.ok) throw new Error('Tipo no encontrado');
      
      const data = await response.json();
      const pokemonList = data.pokemon.map(p => p.pokemon);
      mostrarPokemones(pokemonList);
  
    } catch (error) {
      console.error('Hubo un problema:', error);
    }
  }

  function mostrarPokemones(pokemonList) {
    const pokemonContainer = document.getElementById("pokemon");
    pokemonContainer.innerHTML = ''; 
  
    pokemonList.forEach((pokemon) => {  
      pokemonContainer.style.display = "flex"; 
      const pokemonElement = document.createElement('div');
      pokemonElement.classList.add('pokemon');
      pokemonElement.textContent = pokemon.name; 
      pokemonContainer.appendChild(pokemonElement);
    });
  }

  const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

// Función para obtener los datos
async function buscarListaPokemon() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al obtener los datos');
    
    const data = await response.json(); 
    console.log('Lista de Pokémon:', data.results);
    mostrarPokemones(data.results);

  } catch (error) {
    console.error('Hubo un problema:', error);
  }
}

function mostrarPokemones(pokemonList) {
    const pokemonContainer = document.getElementById("pokemon");
    pokemonContainer.innerHTML = ''; 

  pokemonList.forEach((pokemon) => {  
    pokemonContainer.style.display = "grid ";
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    pokemonElement.textContent = pokemon.name; 
    pokemonContainer.appendChild(pokemonElement);
  });
}

document.getElementById("buscarPokemon").addEventListener("click", buscarPokemonNombre);

document.getElementById("buscarHabilidad").addEventListener("click", buscarPokemonHabilidad);

document.getElementById("buscarTipo").addEventListener("click", buscarPokemonTipo);

document.getElementById("Lista").addEventListener("click", buscarListaPokemon);  