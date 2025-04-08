import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="bg-gray-50">
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout