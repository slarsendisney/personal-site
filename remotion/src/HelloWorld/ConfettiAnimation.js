import React from 'react';
import Lottie from 'react-lottie';

const data = require('./confetti.json');
export default ({}) => {
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: data,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div style={{position: 'absolute', top: 0, left: 0, width: 1200, zIndex:100}}>
			<Lottie
				isClickToPauseDisabled={true}
				options={defaultOptions}
				width={'100%'}
			/>
		</div>
	);
};
