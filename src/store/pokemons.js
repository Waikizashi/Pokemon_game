import {createSlice} from "@reduxjs/toolkit";
import FirebaseClass from "../services/firebase";

export const slice = createSlice({
    name: 'pokemons',
    initialState:{
        isLoading: false,
        data:{},
        errors: null,
    },
    reducers:{
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    }
});

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch) => {
    console.log('%%%:');
    console.log(dispatch(fetchPokemons()));
    const data = await FirebaseClass.getPokemonsOnce();
    console.log('%%%:', data);
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;