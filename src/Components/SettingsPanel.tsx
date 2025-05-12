interface Timers {
	Pomodoro: number;
	Break: number;
	Longbreak: number;
}

type SettingsPanelProps = {
	handleTheme: Function;
	setFont: Function;
	font: string;
	timersStorage: Timers;
	setTimersStorage: Function;
	setTimer: Function;
	mode: string;
	volume: number;
	setVolume: Function;
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({
	handleTheme,
	setFont,
	font,
	timersStorage,
	setTimersStorage,
	mode,
	setTimer,
	volume,
	setVolume,
}) => {
	const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFont(() => {
			localStorage.setItem("Font", e.target.value);
			return e.target.value;
		});
	};

	const handleTimerChange = (
		type: "Pomodoro" | "Break" | "Longbreak",
		minutes: number
	) => {
		const seconds = minutes * 60;
		const updated = { ...timersStorage, [type]: seconds };
		setTimersStorage(updated);
		localStorage.setItem("Timers", JSON.stringify(updated));
		if (type === mode) {
			setTimer(seconds);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseInt(e.target.value);
		setVolume(newVolume);
		localStorage.setItem("Volume", newVolume.toString());
	};
	return (
		<div
			className="flex flex-col items-center w-[90%] max-w-96 rounded-lg p-2 m-4 order-4 
		sm:col-start-2 sm:row-start-2 
		lg:order-none lg:col-start-1 lg:row-start-1 lg:m-0 lg:h-auto lg:max-w-108 lg:self-start lg:w-[100%] lg:mt-6 
		bg-light-panel dark:bg-dark-panel drop-shadow-md"
		>
			<span
				className="font-bold text-2xl 
							text-light-text-main dark:text-dark-text-main"
			>
				Settings
			</span>
			<div
				className="w-[85%] max-w-86 m-2 p-4 flex flex-col rounded-2xl
						bg-light-background dark:bg-dark-background"
			>
				<div className="w-full flex justify-between mb-2">
					<span
						className="text-xl 
								text-light-text-main dark:text-dark-text-main"
					>
						Theme
					</span>
					<button
						onClick={() => handleTheme()}
						className="relative inline-flex items-center h-6 w-12 rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ring-primary 
							bg-gray-400 dark:bg-dark-background "
					>
						<span className="inline-block w-4 h-4 bg-black dark:bg-white rounded-full transform transition-transform translate-x-1 dark:translate-x-6 " />
					</button>
				</div>
				<div className="w-full flex justify-between mb-2">
					<span
						className="text-xl 
								text-light-text-main dark:text-dark-text-main"
					>
						Font
					</span>
					<select
						onChange={(e) => handleFontChange(e)}
						value={font}
						className="rounded p-1
									text-light-text-main dark:text-dark-text-main bg-light-panel dark:bg-dark-panel"
					>
						<option value="sans">Sans</option>
						<option value="mono">Mono</option>
						<option value="semibold">Semibold</option>
						<option value="serif">Serif</option>
					</select>
				</div>
				<div className="w-full flex justify-between mb-2">
					<span
						className="text-xl 
								text-light-text-main dark:text-dark-text-main"
					>
						Volume
					</span>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						onChange={handleVolumeChange}
						className="w-[60%] mt-2"
					/>
				</div>
			</div>
			<div
				className="w-[85%] max-w-86 m-2 p-4 flex flex-col rounded-2xl
						text-light-text-main dark:text-dark-text-main bg-light-background dark:bg-dark-background"
			>
				<div className="w-full flex flex-col justify-between text-xl mb-2">
					<h2 className="font-bold ml-2">Time Durations</h2>
					<div className="flex flex-row items-center justify-items-center justify-between mt-2 p-4">
						<label className="">Pomodoro</label>
						<input
							type="text"
							className="w-[30%] border border-dark-panel  dark:border-light-panel rounded-lg focus:outline-none text-center"
							value={timersStorage.Pomodoro / 60}
							onChange={(e) =>
								handleTimerChange("Pomodoro", Number(e.target.value))
							}
						/>
					</div>
					<div className="flex flex-row items-center justify-items-center justify-between mt-2 p-4">
						<label className="">Break</label>
						<input
							type="text"
							className="w-[30%] border border-dark-panel  dark:border-light-panel rounded-lg focus:outline-none text-center"
							value={timersStorage.Break / 60}
							onChange={(e) =>
								handleTimerChange("Break", Number(e.target.value))
							}
						/>
					</div>
					<div className="flex flex-row items-center justify-items-center justify-between mt-2 p-4">
						<label className="">Longbreak</label>
						<input
							type="text"
							className="w-[30%] border border-dark-panel  dark:border-light-panel rounded-lg focus:outline-none text-center"
							value={timersStorage.Longbreak / 60}
							onChange={(e) =>
								handleTimerChange("Longbreak", Number(e.target.value))
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingsPanel;
