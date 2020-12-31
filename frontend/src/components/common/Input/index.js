import React from 'react';
import './style.css';

const Input = ({ name, error, ...rest }) =>  (
  
  <div>
    <input name={name}{...rest}/>
    { error && <div className="alert alert-danger"> {error} </div> }
  </div>
);
 
export default Input;