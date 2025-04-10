import { useEffect } from "react"
import JobBoard from "../../components/JobBoard/JobBoard"
import { useNavigate } from "react-router-dom"
import FilterComponent from "../../components/FilterComponent/FilterComponent"

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
            <FilterComponent />
            <JobBoard  />
        </main>
    )
}

export default HomePage