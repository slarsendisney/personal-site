import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import ConfettiAnimation from './HelloWorld/ConfettiAnimation'
import { SitePreview } from './HelloWorld/SitePreview';

export const Page: React.FC<{
	url: string;
}> = ({url}) => {
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
					<Logo transitionStart={transitionStart} endPosX={660} endPosY={180} small={true}/>
				</Sequence>
				<Sequence from={transitionStart + 10} durationInFrames={Infinity}>
					<SitePreview url={url}/>
				</Sequence>
			
			</div>
		</div>
	);
};
