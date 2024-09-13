import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useGetTasksQuery } from "./redux/features/api/taskAPI";

const App = () => {
	const { isLoading: isTaskLoading, data: tasks = [], refetch: refetchTasks } = useGetTasksQuery();

	return (
		<div>
			<NavBar />
			<main className="mt-5 d-flex flex-column flex-md-row w-100 justify-content-center p-2 p-md-4  gap-5">
				<TaskForm refetchTasks={refetchTasks} />
				<TaskList tasks={tasks} isTaskLoading={isTaskLoading} refetchTasks={refetchTasks} />
				<Toaster />
			</main>
		</div>
	);
};

export default App;
