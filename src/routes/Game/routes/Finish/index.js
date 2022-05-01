
import PlayerBoard from "../Board/component/PlayerBoard";
import { useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import PokemonCard from "../../../../components/Pokemon-card/card";
import {PokemonContext} from "../../../../context/PokemonContext";
import {FireBaseContext} from "../../../../context/firebaseContext";

import cn from 'classnames'
import s from '../Finish/style.module.css'
import sp from "../../../../components/Pokemon-card/Pk-style.module.css"
import NotFoundPage from "../../../NOT_FOUND/notfound";
import {useDispatch, useSelector} from "react-redux";
import {
    ChangeSelected,
    selectEnemyPokemonsData,
    selectEnemyPokemonsLoading
} from "../../../../store/enemyPokemons";



const FinishPage = () =>{
    const [render, setRender] = useState(true);
    const {direPokemons} = useContext(PokemonContext);
    const {enemyPokemons} = useContext(PokemonContext);
    const enemyPokemonsRedux = useSelector(selectEnemyPokemonsData);
    const {pokemons} = useContext(PokemonContext);
    const dispatch = useDispatch();
    const pokemonsContext = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);
    const history = useHistory();
    //console.log('@@@@: enemyPokemons---Context', enemyPokemons);
    //console.log('####: direPokemons---Context', direPokemons);
    //console.log(":::::",enemyPokemons);
    //console.log("$$$$:",enemyPokemonsRedux);
    let chk = true;
        if(Object.keys(pokemons).length === 0){
            chk = false;
        }
    const handleToStart = () =>{
        history.push('/game');
    }

    const handleAddPokemons = () =>{

        for (let i =0; i<5; i++){
            if(enemyPokemonsRedux[i].selected === true){
                enemyPokemonsRedux[i].selected = false;
                //console.log(enemyPokemons[i]);
                firebase.addPokemon(enemyPokemonsRedux[i]);
            }
        }


        // let date = new Date();
        // newPok[0].id = (+date-1632590000000);
        //firebase.addPokemon(newPok);
        //setRender(!render);
        handleToStart();
    }

    // const handleChosePokemon = (id) =>{
    //     console.log('$$$^^^:',id);
    //
    //     // () => {
    //     //     if (enemyPokemons.length < 1 || selected)
    //     //     {
    //     //         handleChosePokemon(enemyPokemons)
    //     // const pokemon = {...stack[id]}
    //     // pokemonsContext.onSelectedPokemons(id, pokemon);
    //     //
    //     // stack(prevState => ({
    //     //     ...prevState,
    //     //     [id]: {
    //     //         ...prevState[id],
    //     //         selected: !prevState[id].selected,
    //     //     }
    //     // }))
    // }

    const handleChangeSelected = (id) => {

        dispatch(ChangeSelected(id, enemyPokemonsRedux));
        console.log("####:enemyPokemons", enemyPokemonsRedux);
        let check = 0;
        for (let j = 0; j < 5; j++) {
            if (enemyPokemonsRedux[j].selected === true)
            {check++; }
            else{check--;}
            for (let i = 0; i < 5; i++) {
                if ((enemyPokemonsRedux[i].id === id && check < 1) || enemyPokemonsRedux[i].selected === true) {
                    Object.assign(enemyPokemonsRedux[i]).selected = !Object.assign(enemyPokemonsRedux[i]).selected;
                    //console.log('###',enemyPokemonsRedux[i].id, id)
                    //setRender(!render);
                }
            }
    }

    }
if(chk !== false) {
    return (
        <>
            <div className={s.flex}>
                {
                    direPokemons.map(({values, name, id, selected, img, type}) =>
                        <PokemonCard
                            className={s.card}
                            name={name}
                            id={id}
                            isActive={true}
                            isSelected={selected}
                            img={img}
                            type={type}
                            values={values}
                        />
                    )
                }
            </div>
            <button className={cn(s.button, sp.flex)} onClick={handleAddPokemons}>
                END GAME
            </button>
            <div className={s.flex}>
                {
                    enemyPokemonsRedux.map(({values, name, id, selected, img, type}) =>
                        <PokemonCard
                            className={s.card}
                            name={name}
                            id={id}
                            isActive={true}
                            isSelected={selected}
                            img={img}
                            type={type}
                            values={values}
                            onClickCard={handleChangeSelected}
                        />
                    )
                }
            </div>
        </>
    )
}
else {

    return (
    <NotFoundPage/>
    )
}


}

export default FinishPage;