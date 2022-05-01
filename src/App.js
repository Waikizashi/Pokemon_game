import  {useLocation, Route, Switch, Redirect} from "react-router-dom";
//import database from "./services/firebase";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";
import AboutPage from "./routes/About/About";
import ContactPage from "./routes/Contact/Contact";
import NotFoundPage from "./routes/NOT_FOUND/notfound";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer/Footer";
import cn from "classnames"
import Firebase from "./services/firebase";
import {FireBaseContext} from "./context/firebaseContext";

import s from "./app.module.css"
import FirebaseClass from "./services/firebase";

// database.ref('pokemons').once('value', (onSnapshot) => {
// })

const App = () =>{
    const location = useLocation( '/' );
    const isPadding = location.pathname === '/' || location.pathname === '/game/board'
    return(
        <FireBaseContext.Provider value={FirebaseClass}>
            <Switch>
                <Route path="/404" component={NotFoundPage}/>
                <Route>
                    <>
                        <MenuHeader bgActive={!isPadding}/>
                        <div className={cn(s.wrap,
                            {
                        [s.isHomePage]: isPadding
                            })}>
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/game" component={GamePage}/>
                            <Route path="/about" component={AboutPage}/>
                            <Route path="/contact" component={ContactPage}/>
                            <Route render={() => (
                                <Redirect to={"/404"}/>
                            )}/>
                        </Switch>
                        </div>
                        <Footer/>
                    </>
                </Route>
            </Switch>
        </FireBaseContext.Provider>
    )
};
export default App;


/*const [page, setPage] = useState('home');
const handleChangePage = (page) =>{
    setPage(page);
}
switch (page){
    case "home":
        return <HomePage onChangePage ={handleChangePage}/>
    case "game":
        return <GamePage onClickButton ={handleChangePage}/>
    default:
        return <HomePage/>
}*/