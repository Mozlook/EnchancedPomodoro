type PomodoroTimerProps = {
	timer: number;
	handleStart: Function;
	handleReset: Function;
	handleSelectChange: Function;
	mode: string;
	isRunning: boolean;
};
const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
	timer,
	handleStart,
	handleReset,
	handleSelectChange,
	mode,
	isRunning,
}) => {
	const minutes: number = Math.floor(timer / 60);
	const seconds: string = (timer % 60).toString().padStart(2, "0");

	return (
		<div
			className="flex flex-col items-center min-h-56 w-[90%] max-w-96 rounded-2xl p-4 m-4 order-2 
		sm:col-start-1 sm:row-start-1 
		lg:order-none lg:col-start-2 lg:m-0 lg:max-w-104  lg:w-full
		bg-light-panel dark:bg-dark-panel drop-shadow-md "
		>
			<select
				onChange={(e) => handleSelectChange(e.target.value)}
				value={mode}
				className="h-10 rounded-lg px-2 w-full max-w-74 lg:h-16 lg:text-xl cursor-pointer border border-gray-300 dark:border-gray-700 bg-light-background dark:bg-dark-background text-light-text-main dark:text-dark-text-main  appearance-none focus:outline-none focus:ring-0 "
			>
				<option value="Pomodoro">Pomodoro</option>
				<option value="Break">Break</option>
				<option value="Longbreak">Longbreak</option>
			</select>
			<p className=" m-6 text-5xl md:text-6xl lg:text-8xl text-light-text-main dark:text-dark-text-main font-bold  ">
				{minutes}:{seconds}
			</p>
			<div className="flex justify-center gap-4 h-12 w-full px-4">
				<button
					onClick={() => handleStart()}
					className="flex-1 h-full rounded-lg cursor-pointer bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-white font-sans font-bold"
				>
					{isRunning ? "Pause" : "Start"}
				</button>
				<button
					onClick={() => handleReset()}
					className="flex-1 h-full rounded-lg cursor-pointer bg-light-accent dark:bg-dark-accent hover:bg-light-hover dark:hover:bg-dark-hover text-white font-sans font-bold"
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default PomodoroTimer;
