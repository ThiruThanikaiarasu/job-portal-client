import { Link } from 'react-router-dom'
import logo from '../../../src/assets/logo.svg'

const Logo = () => {
    return (
        <Link to="/" className="flex items-center">
            <div className="h-8 w-8">
                <img src={logo} />
            </div>
        </Link>
    )
}

export default Logo