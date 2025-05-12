import { useEffect, useRef } from "react";

declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady: () => void;
	}
}

interface YoutubePlayerProps {
	videoId: string;
	onReady?: () => void;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId, onReady }) => {
	const playerRef = useRef<HTMLDivElement>(null);
	const ytPlayer = useRef<any>(null);

	useEffect(() => {
		window.onYouTubeIframeAPIReady = () => {
			ytPlayer.current = new window.YT.Player(playerRef.current, {
				height: "0",
				width: "0",
				videoId,
				events: {
					onReady: () => {
						ytPlayer.current.setVolume(100);
						onReady?.();
					},
				},
			});
		};
	}, [videoId, onReady]);

	return <div ref={playerRef} id="yt-player" />;
};

export default YoutubePlayer;
