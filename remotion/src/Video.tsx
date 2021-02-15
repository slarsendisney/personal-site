import {Composition} from 'remotion';
import {Article} from './Article';
import {Page} from './Page';
export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Article"
				component={Article}
				durationInFrames={150}
				fps={30}
				width={1200}
				height={628}
				defaultProps={{
					title: 'Site Rebuild',
					tags: 'An article about UX, ReactJS & Gatsby',
				}}
			/>
			<Composition
				id="Page"
				component={Page}
				durationInFrames={150}
				fps={30}
				width={1200}
				height={628}
				defaultProps={{
					url: 'https://sld.codes/stats',
				}}
			/>
		</>
	);
};
