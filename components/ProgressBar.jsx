import { useState, useEffect } from 'react'

function ProgressBar ({ bgcolor, completed }) {

    const [counter, setCounter] = useState(0)
  
    const containerStyles = {
      height: 20,
      width: '100%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 10
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${counter}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }

    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (counter < completed) {
                setCounter(counter + 1);
            }else{
                clearInterval(sampleInterval);
            }
        }, 10);

        return () => {
            clearInterval(sampleInterval);
        };
        
    }, [counter]);
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${counter}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;