import cn from 'classnames';
import {Link} from "react-router-dom";

import s from './style.module.css'

const MENU = [
    {
        title: "HOME",
        to: '/',
    },
    {
        title: "GAME",
        to: '/game',
    },
    {
        title: "ABOUT",
        to: '/about',
    },
    {
        title: "CONTACT",
        to: '/contact',
    },
]

const Menu = ({onClickList, isActive}) => {

    //const pokemonContext = useContext(PokemonContext);
    //console.log('^^^^^^PAGE',window.location.pathname);

    const handleListButton = () =>{
        isActive = !isActive
        onClickList && onClickList(isActive);
    }
    return(
        <>
            <div className={cn(s.menuContainer,
                {[s.active]: isActive === true},
                {[s.deactive]: isActive === false}
            )}>
                <div className={s.overlay} />
                <div className={s.menuContainer}>
                    <ul>
                        {
                            MENU.map(({title, to}, index) => (
                                <li key={index} onClick={handleListButton}>
                                    <Link to={to}>
                                        {title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Menu;