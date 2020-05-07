import React from 'react';
import './style.scss';

const Modal = (props) => <div className="modal">
	<button className="close" onClick={props.clearMessage}>X</button>
	<p className="message">{props.message}</p>
</div>;

export default Modal;
