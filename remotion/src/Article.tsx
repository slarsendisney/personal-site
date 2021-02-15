import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import ConfettiAnimation from './HelloWorld/ConfettiAnimation'

export const Article: React.FC<{
	title: string;
	tags: string;
}> = ({title, tags}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const transitionStart = 25;

	return (
		<div style={{flex: 1, backgroundColor: '#243055'}}>
			<div style={{opacity}}>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<Logo transitionStart={transitionStart} />
				</Sequence>
				<Sequence from={transitionStart + 25} durationInFrames={Infinity}>
					<ConfettiAnimation/>
				</Sequence>
				<Sequence from={transitionStart + 10} durationInFrames={Infinity}>
					<Title titleText={title} />
				</Sequence>
				<Sequence from={transitionStart + 30} durationInFrames={Infinity}>
					<Subtitle subtitle={tags}/>
				</Sequence>
			</div>
		</div>
	);
};
