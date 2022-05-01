import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";

import bg1 from '../../img/bg2.jpg';
import bg2 from '../../img/bg2.jpg';
// import {useDispatch, useSelector} from "react-redux";
// import {getPokemonsAsync, selectPokemonsData} from "../../store/pokemons";
// import {useEffect} from "react";


const HomePage = () => {

    // const PokemonsRedux = useSelector(selectPokemonsData);
    // const dispatch = useDispatch();
    //
    // useEffect( () =>{
    //     dispatch(getPokemonsAsync());
    // },[])
    //
    // useEffect(() => {
    //     console.log("###: Player 2",PokemonsRedux);
    // }, [PokemonsRedux]);


    return (
        <>
            <Header
                title="Pokemon game"
                descr="This is simple triple triad card game"
            />

            <Layout title="Some body once told me" descr="The world is gonna roll me" urlBg={bg1}>
                <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
                    Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
                </p>
            </Layout>
            <Layout title="I ain't" descr="the sharpest tool in the shed" colorBg={"rgba(0, 224, 215, 0.4)"} >
                <p>
                    To win, a majority of the total ten cards played
                    (including the one card that is not placed on the board)
                    must be of the player's card color. To do this, the player
                    must capture cards by placing a card adjacent to an opponent
                    's card whereupon the 'ranks' of the sides where the two cards
                    touch will be compared. If the rank of the opponent's card is
                    higher than the player's card, the player's card will be captured
                    and turned into the opponent's color. If the player's rank is higher,
                    the opponent's card will be captured and changed into the player's color instead.
                </p>
            </Layout>
            <Layout title="She was lookin kinda dumb with her finger" descr="and her thumb In the shape of an `L` on her forehead" urlBg={bg2}>
                <p>
                    Pokémon je termín pre videohry, anime, mangu, zberateľské karty
                    a iné médiá vytvorené Satošim Tadžirim pre japonskú firmu Nintendo.
                    Celý pôvodný názov znie Poketto Monsutá, čo sú japonsky povedané
                    anglické slová Pocket Monsters, po slovensky Vreckové príšery
                </p>
            </Layout>

        </>
    )
}


export default HomePage;


