import React, {Component} from 'react';
import spinner from './images/spinner.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{width: '200px', margin: 'auto', display: 'block'}}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
