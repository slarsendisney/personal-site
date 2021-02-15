import {Img, useCurrentFrame, useVideoConfig} from 'remotion';
import Floats from './Floats.png';
import "./hover.css"
export const Atom: React.FC<{
	scale: number;
}> = () => {
	const frame = useCurrentFrame();
	const config = useVideoConfig();

	return (
		<div style={{position: 'relative'}}>
			<Img src={Floats} className="float-y" style={{
				position:'absolute',
				top:0,
				left:0,
				zIndex:30,
			}}/>
			<div
				style={{
					position:'absolute',
					top:90,
					left:160,
					zIndex:10,
					backgroundColor: '#f5bf37',
					borderRadius: '50%',
					width: 350,
					height: 350,
				}}
			/>
		</div>
	);
};
