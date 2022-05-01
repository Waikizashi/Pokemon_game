import {useEffect, useState, useContext} from "react";
import {useHistory} from "react-router-dom";
//import {FireBaseContext} from "../../../../context/firebaseContext";
import {useDispatch, useSelector} from "react-redux";
import {getPokemonsAsync, selectPokemonsData, selectPokemonsLoading} from "../../../../store/pokemons";

import cn from 'classnames'

import PokemonCard from "../../../../components/Pokemon-card/card";

import s from "./style.module.css"
import sp from "../../../../components/Pokemon-card/Pk-style.module.css"
import {PokemonContext} from "../../../../context/PokemonContext";


const StartPage = () =>{
    //const firebase = useContext(FireBaseContext);
    const history = useHistory();
    //const isLoading = useSelector(selectPokemonsLoading);
    const pokemonsRedux = useSelector(selectPokemonsData);
    const dispatch = useDispatch();
    const pokemonsContext = useContext(PokemonContext);
    const [pk, setPk] = useState({})



    useEffect( () =>{
        pokemonsContext.clean();
       dispatch(getPokemonsAsync());
    },[])

    ///console.log('Context', pokemonsContext);
    //const [render, setRender] = useState(true)

    useEffect(() => {
        setPk(pokemonsRedux);
    }, [pokemonsRedux]);


    const handleChangeSelected = (key) =>{
        const pokemon = {...pk[key]}
        pokemonsContext.onSelectedPokemons(key, pokemon);

        setPk(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
    }
    const handleStartGameClick = () =>{

        history.push('/game/board');
    }
    //console.log('###: Pokemons', pk);

    return(
        <>
            <div className={s.root}>
                <button className={cn(s.button, sp.flex)}
                        onClick={handleStartGameClick}
                        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                >
                    Start Game
                </button>

            </div>
            <div className={s.flex}>
                {
                    Object.entries(pk).map(([key, {values, name, id, selected, img, type}]) =>
                        <PokemonCard
                            className={s.card}
                            key={id}
                            k={key}
                            name={name}
                            id={id}
                            isActive={true}
                            isSelected={selected}
                            img={img}
                            type={type}
                            values={values}
                            onClickCard={() => {
                                if (Object.keys(pokemonsContext.pokemons).length < 5 || selected)
                                {
                                    handleChangeSelected(key)
                                }
                            }}/>
                    )
                }
            </div>

        </>
    );
};

export default StartPage;