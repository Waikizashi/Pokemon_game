import cn from "classnames";

import s from './style.module.css'

const Navbar = ({isActive, onClickBurger, bgActive = false}) =>{
    const handleBurgerButton = () =>{
        isActive=!isActive;
        onClickBurger && onClickBurger(isActive);
    }
    return(
        <>
            <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
                <div className={s.navWrapper}>
                    <p className={s.brand}>
                        LOGO
                    </p>
                    <div className={cn(s.menuButton, {[s.active]: isActive})} onClick={handleBurgerButton}>
                        <span/>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;