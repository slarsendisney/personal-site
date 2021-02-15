import {IFrame, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import './hover.css';

export const SitePreview: React.FC<{
	url: string;
}> = ({url}) => {
	const frame = useCurrentFrame();
	const config = useVideoConfig();
	const prettyURL = url.replace(/(^\w+:|^)\/\//, '');
	const path = prettyURL.replace('sld.codes', '');
	const scaleIn = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: config.fps,
	});

	const scale = frame < 50 ? scaleIn : 1;

	return (
		<div
			style={{
				position: 'relative',
				zIndex: 1,
				transform: `scale(${scale})`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 30,
					left: 30,
					width: 800,
					zIndex: 1,
					height: 800,
				}}
			>
				<div
					style={{
						fontFamily: 'SF Pro Text, Helvetica, Arial',
						position: 'relative',
						backgroundColor: '#0C101D',
						border: '15px solid #0C101D',
						paddingTop: 0,
						borderRadius: 10,
						width: '100%',
						height: '100%',
					}}
				>
					<div
						style={{
							position: 'absolute',
							color: 'white',
							top: -75,
							right: -350,
							width: 300,
						}}
					>
						<h3 style={{fontSize: 60, marginBottom: 0, fontWeight: 'normal'}}>
							<span style={{color: '#f5bf37', fontWeight: 'bold'}}>
								sld.codes
							</span>
						</h3>
						<h3
							style={{
								fontSize: path.length > 10 ? 30 : 60,
								marginTop: 0,
								fontWeight: 'normal',
							}}
						>
							{path}
						</h3>
					</div>
					<div
						style={{
							marginBottom: 8,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<div
							style={{
								height: 15,
								width: 15,
								borderRadius: '50%',
								backgroundColor: '#EF4444',
								marginRight: 5,
							}}
						/>
						<div
							style={{
								height: 15,
								width: 15,
								borderRadius: '50%',
								backgroundColor: '#F59E0B',
								marginRight: 5,
							}}
						/>
						<div
							style={{
								height: 15,
								width: 15,
								borderRadius: '50%',
								backgroundColor: '#10B981',
							}}
						/>
					</div>
					<IFrame
						src={url}
						frameBorder="0"
						style={{width: '100%', height: '100%'}}
					/>
				</div>
			</div>
		</div>
	);
};
