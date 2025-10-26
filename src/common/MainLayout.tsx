import Footer from "./Footer"
import Nav from "./Nav"
import { Outlet } from "react-router"
import './MainLayout.css'

function MainLayout() {
    return (
        <section className='main-container'>
            <Nav />
            <Outlet />
            <Footer />
        </section>
    )
}
export default MainLayout