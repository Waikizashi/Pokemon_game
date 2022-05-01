import {useState} from "react";
import  {useRouteMatch, Route, Switch} from "react-router-dom";

import StartPage from "../Game/routes/Start";
import BoardPage from "../Game/routes/Board";
import FinishPage from "../Game/routes/Finish";
import {PokemonContext} from "../../context/PokemonContext";

const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokmons] = useState({});
    //console.log('###: Pokemons', selectedPokemons);
    const [dire, setDire] = useState([{}]);
    const [enemy, setEnemy] = useState([{}]);
    // const pokemonsRedux = useSelector(selectEnemyPokemonsData);
    // const dispatch = useDispatch();
    //
    // useEffect( () =>{
    //     dispatch(getEnemyPokemonsAsync());
    // },[])
    //
    // useEffect(() => {
    //     console.log("###: Player 2",pokemonsRedux);
    // }, [pokemonsRedux]);

    const handleSelectedPokemons = (key, pokemon) =>{
       setSelectedPokmons(prevState =>{
           if (prevState[key]){
               const copyState = {...prevState};
               delete copyState[key];

               return copyState;
           }
           return {
               ...prevState,
               [key]: pokemon,
           }
       })
    }

    const handleSetSides = (direPokemons, enemyPokemons) =>
    {
        // console.log('DIRE: ', direPokemons);
        // console.log('ENEMY: ', enemyPokemons);
        setDire(direPokemons);
        setEnemy(enemyPokemons);

    }

    const clearContext = () =>{
        setSelectedPokmons([]);
        setEnemy([]);
        setDire([]);
    }

    //console.log('###: Pokemons', dire, enemy);
    return (
        <PokemonContext.Provider value={{
            enemyPokemons: enemy,
            direPokemons: dire,
            pokemons:selectedPokemons,
            onSelectedPokemons: handleSelectedPokemons,
            onSetSides: handleSetSides,
            clean: clearContext
        }}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;