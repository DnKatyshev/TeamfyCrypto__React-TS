import './loader.scss'

export const Loader = ({size}) => {


  return (
    <div className="loader">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={size ? size : 150} height={size ? size : 150} style={{shapeRendering: 'auto', display: 'block', background: 'tranparent'}}>
          <g><path stroke="none" fill="rgba(174, 91, 225, 0.824)" d="M10 50A40 40 0 0 0 90 50A40 42.2 0 0 1 10 50">
          <animateTransform values="0 50 51.1;360 50 51.1" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
          </path></g>
      </svg>
    </div>
  )
}

