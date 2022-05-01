import cn from  'classnames';
import s from './Layout-style.module.css'


const Layout = ({title, urlBg, colorBg, children}) =>{

    const Bg =
        urlBg ?
            {
                backgroundImage: `url(${urlBg})`,
                backgroundSize:`cover`,
                backgroundColor: `${colorBg}`
            }:
        urlBg ?
            {
        backgroundImage: `url(${urlBg})`,
        backgroundSize:`cover`,
            }:
        colorBg ?
            {
            backgroundColor: colorBg
            }:
            {
            backgroundColor: `rgba(0, 143, 215, 0.4)`,
            }

    return(
        <section className={s.root} style={Bg}>
            <div className={s.wrapper}>
                <article>
                    <div className={s.title}>
                        <h3>
                            {title}</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className= {cn(s.desc,s.full)} >
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;