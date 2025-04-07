import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout/MainLayout"
import HomePage from "../pages/HomePage/HomePage"
import FindJobsPage from "../pages/FindJobsPage/FindJobsPage"
import FindTalentsPage from "../pages/FindTalentsPage/FindTalentsPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import Testimonials from "../pages/Testimonials/Testimonials"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path= '/' element={<HomePage />}></Route>
                    <Route path= '/find-jobs' element={<FindJobsPage />}></Route>
                    <Route path= '/find-talents' element={<FindTalentsPage />}></Route>
                    <Route path= '/about' element={<AboutUsPage />}></Route>
                    <Route path= '/testimonials' element={<Testimonials />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes