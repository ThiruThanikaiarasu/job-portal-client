import { SVGProps } from "../../types/svg"

const Dollar: React.FC<SVGProps> = ({ width = '40', height = '40', className = '' }) => {
    return (
        <svg 
            width={width}
            height={height}
            className={className}
            viewBox="0 0 18 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="M17.1728 10.0001L8.99096 15.4546L0.809143 10.0001M17.1728 13.6365L8.99096 19.091L0.809143 13.6365M17.1728 6.36373L8.99096 11.8183L0.809143 6.36373L8.99096 0.90918L17.1728 6.36373Z" 
                stroke="#5A5A5A" 
                stroke-width="1.6" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
        </svg>
    )
}

export default Dollar
