import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Subtitle: React.FC<{
	subtitle: string;
}> = ({subtitle}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = subtitle.split(' ').map((t) => ` ${t} `);
	return (
		<div
			style={{
				left: 50,
				textAlign: 'left',
				position: 'absolute',
				top: 130,
				width: '100%',
				fontFamily: 'Helvetica, Arial',
			}}
		>
			<h4
				style={{
					fontSize: 48,
				}}
			>
				{text.map((t, i) => {
					return (
						<span>
							<span
								key={t}
								style={{
									color: '#f5bf37',
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
							{i !== 0 && i % 3 === 0 && <br />}
						</span>
					);
				})}
			</h4>
			<div
				style={{
					backgroundColor: '#c63082',
					color:'white',
					marginTop:0,
					fontSize:50,
					borderRadius: 10,
					width: 350,
					paddingTop: 10,
					paddingBottom: 10,
					paddingLeft: 20,
					paddingRight: 20,
					marginLeft: 10,
					textAlign:'center',
					fontWeight:'bold'
				}}
			>
				Learn More
			</div>
		</div>
	);
};
