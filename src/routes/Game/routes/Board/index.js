import s from './style.module.css';
import {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {PokemonContext} from "../../../../context/PokemonContext";
import PokemonCard from "../../../../components/Pokemon-card/card";
import PlayerBoard from "./component/PlayerBoard";
import {useDispatch, useSelector} from "react-redux";
import {getEnemyPokemonsAsync, selectEnemyPokemonsData} from "../../../../store/enemyPokemons";

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
      if(item.card.possession === 'red'){
          player2Count++;
      }
      else if(item.card.possession === 'blue'){
          player1Count++;
      }

  });
    return[player1Count,player2Count];
}

const BoardPage = () => {
    const {pokemons} = useContext(PokemonContext);
    const pokemonsContext = useContext(PokemonContext);
    const enemyPokemonsRedux = useSelector(selectEnemyPokemonsData);
    const dispatch = useDispatch();
    //pokemonsContext.clean();
    //console.log('####: PokemonsContext', usedPokemons);

    const [board, setBoard] = useState([])
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item =>({
            ...item,
            possession: 'blue',
        }))
    })
    const [player2, setPlayer2] = useState([])
    const [chosenCard, setChosenCard] = useState(null);
    const history = useHistory();
    const [steps, setSteps] = useState(0);


    useEffect(async() => {
        let boardResponse;
        boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const  boardRequest = await boardResponse.json();

        setBoard(boardRequest.data)

        dispatch(getEnemyPokemonsAsync());
        setPlayer2(enemyPokemonsRedux);
        console.log("RERENDER");
        // const player2Response = await  fetch('https://reactmarathon-api.netlify.app/api/create-player');
        // const player2Request = await player2Response.json();
        //
        //pokemonsContext.onSetSides(player1, player2Request.data);
        //
        // setPlayer2(() => {
        //
        //     //console.log('###p2',player2Request.data);
        //     return player2Request.data.map(item =>({
        //         ...item,
        //         possession: 'red',
        //     }
        //     ))

        //})

    },[])

    useEffect(() => {
        pokemonsContext.onSetSides(player1, player2);
    }, [enemyPokemonsRedux]);


    if(Object.keys(pokemons).length === 0){
        history.replace('/game');
    }

    // const handleSetPokemons = () =>{
    //     console.log('$$$P1', pokemons);
    //     console.log('$$$P2', player2);
    //     //pokemonsContext.onSetEnemy(player1, player2);
    // }



    const handleClickBoardPlate = async (position) =>{
       // console.log('####: position', position);
        //console.log('####: chosenCard', chosenCard)
        if (chosenCard){
            const params ={
                position,
                card: chosenCard,
                board,
            };
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            const request = await res.json();

            //console.log('####: request', request);


            if (chosenCard.player === 1){
                setPlayer1(prevState => prevState.filter(item => item.id !== chosenCard.id));
            }
            if (chosenCard.player === 2){
                setPlayer2(prevState => prevState.filter(item => item.id !== chosenCard.id));
            }
            setBoard(request.data);

            setSteps(prevState =>{
                const count = prevState +1;
                return count;
            })
        }
    };

    useEffect(() => {
        if(steps === 9){
            const [count1, count2] = counterWin(board, player1, player2);
            if (count1 > count2){
                alert('WIN Player I');
            }
            else if(count2 > count1){
                alert('WIN Player II');
            }
            else{
                alert('...DROW...')
            }
            history.push('/game/finish');
            //handleSetPokemons();
        }
    }, [steps])
    //console.log('@@@@:', player1);

    //console.log('@@@@:', pokemons);
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChosenCard(card)}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handleClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize/>
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChosenCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;