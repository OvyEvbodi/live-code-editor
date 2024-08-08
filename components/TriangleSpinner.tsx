import { Triangle } from 'react-loader-spinner';

const TriangleSpinner = () => {
  return (
    <div>
      <Triangle
        visible={true}
        height="120"
        width="120"
        color="#8b5cf6"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default TriangleSpinner;