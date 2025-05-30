import { SVGProps } from "../../types/svg"

const CloseMenu: React.FC<SVGProps> = ({ width = '40', height = '40', className = '' }) => {
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
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
}

export default CloseMenu
