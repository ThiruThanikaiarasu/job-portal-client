import { useState } from 'react'
import NavLink from './NavLink'
import Logo from './Logo'
import ActionButton from '../ui/ActionButton'
import MobileMenu from './MobileMenu'
import HamburgerMenu from '../../svg/HamburgerMenu/HamburgerMenu'
import CloseMenu from '../../svg/CloseMenu.tsx/CloseMenu'
import JobPostModal from '../JobPostModal/JobPostModal'

const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    
    const navLinks = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Find Jobs', path: '/find-jobs' },
        { id: 3, title: 'Find Talents', path: '/find-talents' },
        { id: 4, title: 'About us', path: '/about' },
        { id: 5, title: 'Testimonials', path: '/testimonials' },
    ]

    const openCreateJobModal = () => {
        setShowModal(true)
    }

    
      



    return (
        <>
            <nav className="bg-white shadow-md rounded-full px-4 sm:px-6 md:px-8 py-4 max-w-5xl mx-auto my-4">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>
                    
                    <div className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.id} title={link.title} path={link.path} />
                        ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <ActionButton text="Create Jobs" onClick={openCreateJobModal}/>
                        </div>
                    
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-gray-700 hover:text-purple-600 focus:outline-none"
                            >
                                {mobileMenuOpen ? (
                                    <CloseMenu height='30' width='30'/>
                                ) : (
                                    <HamburgerMenu height='30' width='30'/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
    
            <MobileMenu navLinks={navLinks} isOpen={mobileMenuOpen} />

            <JobPostModal showModal={showModal} setShowModal={setShowModal}/>
        </>
    )
}

export default NavBar