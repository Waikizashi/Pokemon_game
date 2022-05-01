import Menu from "../MenuHeader/menu/index";
import Navbar from "./navbar";
import {useState} from "react";


const MenuHeader = ({bgActive}) =>{
    const [isActive, setActive] = useState(null);
    const handleActivateMenu = (state) =>{
        setActive(state);
    }
            return (
                <>
                    <Menu isActive={isActive} onClickList={handleActivateMenu}/>
                    <Navbar isActive={isActive} onClickBurger = {handleActivateMenu} bgActive={bgActive}/>
                </>
            )
};
export default MenuHeader;