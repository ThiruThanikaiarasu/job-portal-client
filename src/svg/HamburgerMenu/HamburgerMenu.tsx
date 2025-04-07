interface HamburgerMenuProps {
    width?: string, 
    height?: string
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ width = '40', height = '40' }) => {
    return (
        <svg 
            width={width}
            height={height}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
            />
        </svg>

    )
}

export default HamburgerMenu