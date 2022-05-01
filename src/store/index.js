import {configureStore} from "@reduxjs/toolkit";
import pokemonsReducer from './pokemons'
import enemyPokemonsReducer from "./enemyPokemons";

export default configureStore({
    reducer:{
        pokemons: pokemonsReducer,
        enemyPokemons: enemyPokemonsReducer,
    }
})