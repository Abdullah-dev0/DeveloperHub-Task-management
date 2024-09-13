import { useEffect } from "react";
import { FaCheck, FaPlayCircle, FaTrashAlt } from "react-icons/fa";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../redux/features/api/taskAPI";
import Loaders from "./Loaders";
import NoData from "./NoData";

const TaskList = ({ tasks, isTaskLoading, refetchTasks }) => {
  const [deleteTask, deleteResult] = useDeleteTaskMutation();
  const [updateTaskStatus, updateResult] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (deleteResult.data || updateResult.data) {
      refetchTasks();
    }
  }, [deleteResult, updateResult, refetchTasks]);

  // delete task handler
  const handelDeleteTask = (id) => {
    deleteTask(id);
  };

  // start task handler
  const startTask = (id) => {
    updateTaskStatus({ id: id, status: "progress" });
  };

  // completed task handler
  const completedTask = (id) => {
    updateTaskStatus({ id: id, status: "completed" });
  };

  return (
    <div className="w-100">
      <h1 className="text-center mb-5">Task List</h1>
      {isTaskLoading ? (
        <div>
          <Loaders />
        </div>
      ) : tasks?.length <= 0 ? (
        <div>
          <NoData />
        </div>
      ) : (
        <ul className="list-group">
          {tasks?.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{task.title}</div>
                <p>{task.description}</p>
              </div>
              <div className="d-flex flex-column align-items-end gap-3">
                <div
                  className={`badge text-uppercase ${
                    task?.status === "completed"
                      ? "bg-success"
                      : task?.status === "progress"
                      ? "bg-info "
                      : "bg-warning"
                  } `}
                >
                  {task.status}
                </div>
                <div className="d-flex  flex-column  gap-2">
                  <button
                    title="Delete this task!"
                    type="button"
                    className="bg-danger text-white  tma-circle-btn"
                    onClick={() => handelDeleteTask(task._id)}
                  >
                    <FaTrashAlt />
                  </button>
                  {task?.status === "progress" ? (
                    <button
                      title="Completed this task!"
                      type="button"
                      className="bg-success text-white  tma-circle-btn"
                      onClick={() => completedTask(task._id)}
                    >
                      <FaCheck />
                    </button>
                  ) : (
                    task?.status === "todo" && (
                      <button
                        title="Start this task!"
                        type="button"
                        onClick={() => startTask(task._id)}
                        className="bg-info  text-white  tma-circle-btn fs-4"
                      >
                        <FaPlayCircle />
                      </button>
                    )
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
