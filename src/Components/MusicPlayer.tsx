type MusicPlayerProps = {
	volume: number;
};

import {
	PlayIcon,
	BackwardIcon,
	ForwardIcon,
	PauseIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { streams } from "./streams.ts";

const MusicPlayer: React.FC<MusicPlayerProps> = ({ volume }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const playerRef = useRef<YouTubePlayer | null>(null);
	const [currentStream, setCurrentStream] = useState<number>(0);

	const handlePlayPause = () => {
		if (playerRef.current) {
			if (isPlaying) {
				playerRef.current.pauseVideo();
			} else {
				playerRef.current.playVideo();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleNext = () => {
		const nextIndex = (currentStream + 1) % streams.length;
		setCurrentStream(nextIndex);
	};

	const handlePrev = () => {
		const prevIndex = (currentStream - 1 + streams.length) % streams.length;
		setCurrentStream(prevIndex);
	};

	const onPlayerReady = (event: any) => {
		playerRef.current = event.target;
		playerRef.current.setVolume(volume);
		if (isPlaying) {
			playerRef.current.playVideo();
		}
	};

	useEffect(() => {
		playerRef.current?.setVolume(volume);
	}, [volume]);

	return (
		<>
			<YouTube
				videoId={streams[currentStream].id}
				opts={{
					height: "0",
					width: "0",
					playerVars: {
						autoplay: 1,
						mute: 0,
					},
				}}
				onReady={onPlayerReady}
			/>

			<div
				className="flex flex-col items-center w-[90%] max-w-48 rounded-3xl p-2 m-4 order-3
					sm:col-start-1 sm:row-start-2
					lg:col-start-2 lg:max-w-120 lg:max-h-36 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:justify-items-center
					bg-light-panel dark:bg-dark-panel"
			>
				<div
					className="flex flex-col pt-2
					lg:col-start-1 lg:row-start-1 lg:col-span-2 lg:self-start
					text-light-text-main dark:text-dark-text-main"
				>
					<span className="opacity-50 text-sm">NOW PLAYING</span>
					<span className="text-xl">{streams[currentStream].title}</span>
				</div>
				<img
					className="w-32 h-32 mt-2 rounded-2xl object-cover
					lg:w-28 lg:h-28 lg:self-start
					lg:col-start-3 lg:row-start-1"
					src={streams[currentStream].image}
					alt="Station Image"
				/>
				<div
					className="flex justify-center items-center gap-4 m-2
						lg:col-start-1 lg:row-start-2 lg:col-span-2 lg:gap-6"
				>
					<button>
						<BackwardIcon
							onClick={handlePrev}
							className="w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-120
							text-light-text-main dark:text-dark-text-main"
						/>
					</button>
					<button
						onClick={handlePlayPause}
						className="rounded-full p-3 cursor-pointer transition-transform duration-200 hover:scale-120
						text-light-text-main dark:text-dark-text-main bg-light-background dark:bg-dark-background"
					>
						{isPlaying ? (
							<PauseIcon className="w-6 h-6" />
						) : (
							<PlayIcon className="w-6 h-6" />
						)}
					</button>
					<button>
						<ForwardIcon
							onClick={handleNext}
							className="w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-120
							text-light-text-main dark:text-dark-text-main"
						/>
					</button>
				</div>
			</div>
		</>
	);
};

export default MusicPlayer;
