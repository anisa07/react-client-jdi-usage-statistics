import React from 'react';
import './style.scss';

const Item = (props) => {
	return (
		<div className="item">
			<p className="label">{props.label}:</p>
			<p className="value">{props.value}</p>
		</div>
	);
};

export default Item;
