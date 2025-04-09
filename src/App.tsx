import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { Toaster } from "sonner"
import { AppDataContextProvider } from "./context/AppDataContext"

const App = () => {    

    return (
        <AppDataContextProvider>
            <Router>
                <AppRoutes />
                <Toaster richColors position="top-right"/>
            </Router>
        </AppDataContextProvider>
    )
}

export default App