import React from 'react';
import './style.scss';

const Input = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="control">
      <label className="label">{props.label}</label>
      <input className="input" type={props.type} value={props.value} onChange={handleChange} />
      <p className="error">{props.error}</p>
    </div>
  );
};

export default Input;
