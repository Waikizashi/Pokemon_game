import {useHistory} from "react-router-dom"
//import {useDispatch, useSelector} from "react-redux";
//import {plusAction, selectCount} from "../../store/counter";

import s from './Header-style.module.css'


const Header = ({title, descr}) =>{
    const history = useHistory();
    //const count = useSelector(selectCount);
    //const dispatch = useDispatch();
    //console.log('###: count', count);

    const handleClick = () =>{
        //dispatch(plusAction(2));
        history.push('/game');
        //onClickButton && onClickButton('game');
    }
    return(
        <header className={s.root}>
            <div className={s.forest}/>
            <div className={s.silhouette}/>
            <div className={s.moon}/>
            <div className={s.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <button className={s.button} onClick={handleClick}>
                    Start game
                </button>
            </div>
        </header>
    )
}

export default Header;