interface ActionButtonProps {
    text: string
    onClick: () => void
  }

const ActionButton:React.FC<ActionButtonProps> = ({ text, onClick }) => {
  
    return (
        <button 
            onClick={onClick}
            className="bg-gradient-purple hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
        >
            {text}
        </button>
    )
}

export default ActionButton