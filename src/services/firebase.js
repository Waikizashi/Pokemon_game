import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyDkvwWdSXxry-G_QbfeT6LSwi7Pg764Fu4",
    authDomain: "pokemon-game-809e1.firebaseapp.com",
    databaseURL: "https://pokemon-game-809e1-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-809e1",
    storageBucket: "pokemon-game-809e1.appspot.com",
    messagingSenderId: "879963485424",
    appId: "1:879963485424:web:04ef36e3639e27d1847e35"
};

firebase.initializeApp(firebaseConfig);

class Firebase{
    constructor() {
        //firebase.initializeApp(firebaseConfig);
        this.fire = firebase;
        this.database = this.fire.database();

    }

    getPokemonSocket = (cb) =>{
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(snapshot.val());
        })
    }

    offPokemonSocket = () =>{
        this.database.ref('pokemons').off()
    }

    getPokemonsOnce = async () =>{
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val()).catch((error)=>console.log('error:',error.code));
    }

    postPokemon = (Key, pokemon) =>{
        this.database.ref('pokemons/'+ Key).update({
            "active": pokemon[1].active,
        });
    }

    addPokemon = (newPok) =>{
        const newKey = this.database.ref().child('pokemons').push().key;
             this.database.ref('pokemons/' + newKey).set(newPok);
        }
}
const FirebaseClass = new Firebase();

export default FirebaseClass;