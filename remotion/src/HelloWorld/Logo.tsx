import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Atom} from './Atom';

export const Logo: React.FC<{
	transitionStart: number;
	endPosX: number;
	endPosY: number;
	small: boolean;
}> = ({transitionStart, endPosX=600, endPosY=100, small=false}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const rotationDevelopment = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const scaleIn = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	const translation = interpolate(
		spring({
			frame: frame - transitionStart,
			fps: videoConfig.fps,
			config: {
				damping: 100,
				mass: 0.5,
			},
		}),
		[0, 1],
		[0, endPosY]
	);
	const translationX = interpolate(
		spring({
			frame: frame - transitionStart,
			fps: videoConfig.fps,
			config: {
				damping: 100,
				mass: 0.5,
			},
		}),
		[0, 1],
		[0, endPosX]
	);

	const scale = frame < 50 ? scaleIn : 1;


	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 50,
				width: videoConfig.width,
				height: videoConfig.height,
				transform: `scale(${scale}) translateY(${translation}px) translateX(${translationX}px)`,
			}}
		>
			<Atom scale={rotationDevelopment} small={small}/>
		</div>
	);
};
