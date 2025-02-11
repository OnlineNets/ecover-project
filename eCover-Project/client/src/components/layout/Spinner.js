import React from 'react';
import spinner from './spinner.gif';

//Spinner gif
const Spinner = () => (
  <div>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block'}}
      alt='Loading...'
    />
  </div>
);

export default Spinner;
