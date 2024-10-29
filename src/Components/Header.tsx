import "../styles/Header.css"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <div className="header__container">
            <div className="logo"></div>
            <div className="btn__container__header">
                <NavLink to="/"><button className="btn__home"></button></NavLink>
                <NavLink to={"/favorite"}><button className="btn__selected"></button></NavLink>
            </div>
        </div>
    </header>
  )
}

export default Header
