import React from 'react';
import spinner from "./../../images/Rolling-1s-200px.gif";

const Spinner = () => {

    return (
      <div className='text-center xy'>
        <img src={spinner} alt='loading' />
      </div>
    )
}

export default Spinner;
