import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Title: React.FC<{
	titleText: string;
}> = ({titleText}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = titleText.split(' ').map((t) => ` ${t} `);
	return (
		<h1
			style={{
				fontFamily: 'SF Pro Text, Helvetica, Arial',
				fontWeight: 'bold',
				fontSize: titleText.length > 20 ? 60: 100,
				textAlign: 'left',
				position: 'absolute',
				top: 10,
				left:50,
				width: '100%',
			}}
		>
			{text.map((t, i) => {
				return (
					<span
						key={t}
						style={{
							color: "white",
							marginLeft: 10,
							marginRight: 10,
							transform: `scale(${spring({
								fps: videoConfig.fps,
								frame: frame - i * 5,
								config: {
									damping: 100,
									stiffness: 200,
									mass: 0.5,
								},
							})})`,
							display: 'inline-block',
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
