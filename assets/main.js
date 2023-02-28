//RECUPERANDO DADOS - RECOVER DATES 
const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonImg = document.querySelector('.pokemon-img');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const audio = document.querySelector('audio');
const buttonAudio = document.querySelector('.btn-audio');



//FUNÇÃO DE BUSCA - SEARCH FUNCTION

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

//RENDERIZAÇÃO NA TELA - RENDER FUNCTION

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...';
    pokemonId.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :(';
        pokemonId.innerHTML = '';
    }
}

//ADICIONANDO EVENTOS NO INPUT E BOTÕES - INPUT & BUTTONS EVENTS 

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
   
});

btnPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
   
});


renderPokemon(searchPokemon);

//ADICIONANDO EVENTO NO BOTÃO DE AUDIO - AUDIO BUTTONS EVENTS

buttonAudio.addEventListener('click', () =>{
        audio.currentTime = 0.6;
        audio.play();
});