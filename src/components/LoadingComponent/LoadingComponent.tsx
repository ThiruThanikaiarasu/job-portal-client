import { ClipLoader } from 'react-spinners'

const LoadingComponent = () => {
  return (
    <div className='flex justify-center'>
        <ClipLoader color="#9333EA" loading={true} size={50} />
    </div>
  )
}

export default LoadingComponent