import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { Toaster } from "sonner"

const App = () => {    

    return (
        <Router>
            <AppRoutes />
            <Toaster richColors position="top-right"/>
        </Router>
    )
}

export default App