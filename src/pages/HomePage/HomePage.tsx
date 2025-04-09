import { useEffect } from "react"
import JobBoard from "../../components/JobBoard/JobBoard"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isUserLoggedIn')
        const userData = localStorage.getItem('userData')
        if(!isUserLoggedIn || !userData) {
            navigate('/login')
        }
    }, [])
    return (
        <main>
            <JobBoard  />
        </main>
    )
}

export default HomePage