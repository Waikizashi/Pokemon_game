import {createSlice} from "@reduxjs/toolkit";

export const enemySlice = createSlice({
    name: 'enemyPokemons',
    initialState:{
        isLoading: false,
        data:{},
        errors: null,
    },
    reducers:{
        fetchEnemyPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchEnemyPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchEnemyPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    }
});

export const {fetchEnemyPokemons, fetchEnemyPokemonsResolve, fetchEnemyPokemonsReject} = enemySlice.actions;

export const selectEnemyPokemonsLoading = state => state.enemyPokemons.isLoading;
export const selectEnemyPokemonsData = state => state.enemyPokemons.data;

export const getEnemyPokemonsAsync = () => async (dispatch) => {

    dispatch(fetchEnemyPokemons());
    const player2Response = await  fetch('https://reactmarathon-api.netlify.app/api/create-player');
    const player2Request = await player2Response.json();
    const player2 = (() => {

        //console.log('###p2',player2Request.data);
        return player2Request.data.map(item =>({
                ...item,
                possession: 'red',
                selected: false,
            }
        ))

    })

    //console.log("###: PLayer2", player2());
    dispatch(fetchEnemyPokemonsResolve(player2()));
}

export const ChangeSelected = (id, pokemons) => (dispatch) => {
    dispatch(fetchEnemyPokemons());
    pokemons.forEach((pokemon, index) => {
        if (pokemon.id === id) {
            console.log(pokemons[index].id,"///", pokemons[index].selected)
            Object.entries(pokemons)[index].selected = !pokemons[index].selected;
        }
    })

    dispatch(fetchEnemyPokemonsResolve(pokemons));
}

export default enemySlice.reducer;