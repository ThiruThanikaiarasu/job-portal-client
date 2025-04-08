import { SVGProps } from "../../types/svg"

const ThreeDot: React.FC<SVGProps> = ({ width = '40', height = '40', className = '' }) => {
    return (
        <svg 
            width={width}
            height={height}
            className={className}
            viewBox="0 0 16 16" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="#000000"  
            preserveAspectRatio="xMidYMid meet"
        >
            <path 
                // stroke-linecap="round" 
                // stroke-linejoin="round" 
                // stroke-width="2" 
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" 
            />
        </svg>

    )
}

export default ThreeDot
