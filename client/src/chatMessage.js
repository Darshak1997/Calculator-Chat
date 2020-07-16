import React from 'react'
import './App.css';
   
export default ({ name, message }) =>
<div className="messages">
  <p>
    <strong>{name}: </strong> <em>{message}</em>
  </p>
</div>