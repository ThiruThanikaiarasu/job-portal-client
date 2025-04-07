import { Outlet } from "react-router-dom"
import NavBar from "../../components/navigation/NavBar"

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout