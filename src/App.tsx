import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import PomodoroTimer from "./Components/PomodoroTimer.tsx";
import ToDoList from "./Components/ToDoList.tsx";
import SettingsPanel from "./Components/SettingsPanel.tsx";
import MusicPlayer from "./Components/MusicPlayer.tsx";
import ClassHolder from "./Components/ClassHolder.tsx";
interface Timers {
	Pomodoro: number;
	Break: number;
	Longbreak: number;
}
type Mode = "Pomodoro" | "Break" | "Longbreak";
const Pomodoro: React.FC = () => {
	const [timer, setTimer] = useState<number>(() => {
		const saved = localStorage.getItem("Timers");
		if (saved) {
			const parsed = JSON.parse(saved) as Timers;
			if (typeof parsed.Pomodoro === "number") {
				return parsed.Pomodoro;
			}
		}
		return 1500;
	});
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [mode, setMode] = useState<Mode>("Pomodoro");
	const [sessionNum, setSessionNum] = useState<number>(0);
	const [alarm, { stop }] = useSound("/alarm.mp3", { volume: 0.4 });
	const [volume, setVolume] = useState<number>(() => {
		return Number(localStorage.getItem("Volume")) || 50;
	});
	const playAlarm = () => {
		alarm();
		setTimeout(() => stop(), 3000);
	};
	const [theme, setTheme] = useState<string>(() => {
		return localStorage.getItem("Theme") || "dark";
	});

	const [font, setFont] = useState<string>(() => {
		return localStorage.getItem("Font") || "sans";
	});

	const [timersStorage, setTimersStorage] = useState<Timers>(() => {
		const saved = localStorage.getItem("Timers");
		return saved
			? (JSON.parse(saved) as Timers)
			: { Pomodoro: 1500, Break: 300, Longbreak: 900 };
	});
	function handleSelectChange(mode: Mode) {
		if (mode === "Pomodoro") {
			setTimer(timersStorage.Pomodoro);
		} else if (mode === "Break") {
			setTimer(timersStorage.Break);
		} else if (mode === "Longbreak") {
			setTimer(timersStorage.Longbreak);
		}
		setMode(mode);
		setIsRunning(false);
	}

	function handleTheme() {
		setTheme((prev) => {
			const newTheme = prev === "light" ? "dark" : "light";
			localStorage.setItem("Theme", newTheme);
			return newTheme;
		});
	}

	const handleReset = () => {
		setIsRunning(false);
		setTimer(timersStorage[mode]);
		setSessionNum(0);
	};

	const handleStart = () => {
		setIsRunning((prevIsRunning) => !prevIsRunning);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (isRunning) {
				setTimer((prev) => {
					const newTime = prev - 1;
					if (newTime === 0) {
						handleTimerZero();
					}
					return newTime;
				});
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [isRunning]);

	const handleTimerZero = () => {
		setIsRunning(false);
		playAlarm();
		if (sessionNum === 2) {
			setSessionNum(0);
			setMode("Longbreak");
			setTimer(timersStorage.Longbreak);
		} else {
			const newMode = mode === "Pomodoro" ? "Break" : "Pomodoro";
			setMode(newMode);
			setTimer(timersStorage[newMode]);
			setSessionNum((prev) => prev + 1);
		}
	};
	return (
		<div className={`flex flex-col min-h-screen ${theme} font-${font}`}>
			<main
				className="flex flex-col flex-grow items-center h-full min-h-screen
							 sm:grid sm:grid-cols-2 sm:grid-rows-[16rem_auto] sm:gap-x-4 sm:auto-rows-min sm:items-start sm:justify-items-center 
							 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:auto-rows-auto lg:gap-4 lg:items-center lg:justify-items-center
							 bg-light-background dark:bg-dark-background relative"
			>
				<PomodoroTimer
					handleSelectChange={handleSelectChange}
					timer={timer}
					handleStart={handleStart}
					handleReset={handleReset}
					mode={mode}
					isRunning={isRunning}
				/>
				<ToDoList />
				<SettingsPanel
					handleTheme={handleTheme}
					font={font}
					setFont={setFont}
					timersStorage={timersStorage}
					setTimersStorage={setTimersStorage}
					mode={mode}
					setTimer={setTimer}
					volume={volume}
					setVolume={setVolume}
				/>
				<MusicPlayer volume={volume} />
				<ClassHolder />
			</main>
		</div>
	);
};
export default Pomodoro;
