import { SVGProps } from "../../types/svg"

const HamburgerMenu: React.FC<SVGProps> = ({ width = '40', height = '40', className = '' }) => {
    return (
        <svg 
            width={width}
            height={height}
            className={className}
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