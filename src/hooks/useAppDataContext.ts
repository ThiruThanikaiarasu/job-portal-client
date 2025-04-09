import { useContext } from "react"
import { AppDataContext } from "../context/AppDataContext"

const useAppDataContext = () => {
    const context = useContext(AppDataContext)
    if (!context) {
        throw new Error("useAppDataContext must be used within an AppDataContextProvider")
    }
    return context
}

export default useAppDataContext