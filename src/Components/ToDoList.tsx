import { useState, useEffect } from "react";

type Task = { name: string; isComplete: boolean };

const ToDoList: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const json = localStorage.getItem("Tasks");
		return json ? (JSON.parse(json) as Task[]) : [];
	});
	const [draft, setDraft] = useState("");

	useEffect(() => {
		localStorage.setItem("Tasks", JSON.stringify(tasks));
	}, [tasks]);

	const commitTask = () => {
		if (draft.trim() === "") return;
		setTasks([...tasks, { name: draft.trim(), isComplete: false }]);
		setDraft("");
	};

	const onKeyDown: React.KeyboardEventHandler = (e) => {
		if (e.key === "Enter") commitTask();
	};

	const handleDelete = (index: number) => {
		setTasks((prev) => prev.filter((_, i) => i !== index));
	};

	const handleComplete = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		setTasks((prev) =>
			prev.map((task, i) =>
				i === index ? { ...task, isComplete: e.target.checked } : task
			)
		);
	};
	return (
		<>
			<div
				className="flex flex-col items-center w-[90%] max-w-96 rounded-lg p-2 m-4 order-2 
			sm:col-start-2 sm:row-start-1 sm:row-span-2 
			lg:order-none lg:m-0 lg:h-auto lg:col-start-3 lg:self-start lg:w-[100%] lg:max-w-120 lg:mt-6 lg:mr-6
			bg-light-panel dark:bg-dark-panel drop-shadow-md"
			>
				<span className="font-bold text-2xl text-light-text-main dark:text-dark-text-main">
					Tasks
				</span>
				<div className="text-xl p-4 mt-4 rounded-2xl self-start w-full bg-light-background dark:bg-dark-background text-light-text-main dark:text-dark-text-main">
					{tasks.length === 0 ? (
						<span>Add new tasks and keep track of your work!</span>
					) : (
						tasks.map((task, index) => (
							<div
								key={index}
								className="flex flex-row items-center w-full mb-2 ml-2"
							>
								<input
									className="m-2 form-checkbox h-5 w-5 accent-green-500 border-gray-300 dark:border-gray-600 rounded focus:outline-none transition"
									type="checkbox"
									checked={task.isComplete}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleComplete(e, index)
									}
								/>
								<span
									className={`overflow-hidden text-xl ${
										task.isComplete ? `line-through` : ``
									}`}
								>
									{task.name}
								</span>
								<div className="flex items-center justify-center ml-auto mr-2 h-8 w-8 rounded-full hover:bg-gray-500 hover:bg-opacity-50">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="size-5 cursor-pointer"
										onClick={() => handleDelete(index)}
									>
										<path
											fillRule="evenodd"
											d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</div>
						))
					)}
				</div>

				<div className="flex items-center bg-light-panel dark:bg-dark-panel rounded-lg p-2 drop-shadow-md">
					<input
						type="text"
						autoFocus
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						onKeyDown={onKeyDown}
						className="text-xl mt-4 rounded-xl p-2 w-[95%] max-w-60 focus:outline-none bg-light-background dark:bg-dark-background text-light-text-main dark:text-dark-text-main"
					/>
					<button
						onClick={commitTask}
						className="ml-2 text-xl mt-4 rounded-xl p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 bg-light-background dark:bg-dark-background text-light-text-main dark:text-dark-text-main"
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default ToDoList;
