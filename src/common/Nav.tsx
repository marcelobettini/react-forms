import { NavLink } from "react-router"
import './Nav.css'
const Nav = () => {
    return (
        <header className="header">
            <h1>Forms in React</h1>
            <nav>
                <NavLink to={''}
                    className={({ isActive }) => isActive ? 'active-link' : undefined}
                >Home</NavLink>
                <NavLink to={'forms/formik'}
                    className={({ isActive }) => isActive ? 'active-link' : undefined}
                >Formik</NavLink>
                <NavLink to={'forms/useForm'}
                    className={({ isActive }) => isActive ? 'active-link' : undefined}
                >useForm</NavLink>
            </nav>

        </header>
    )
}
export default Nav