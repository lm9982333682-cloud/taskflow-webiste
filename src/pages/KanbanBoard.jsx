
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../service/taskService.js";
import { refreshTaskList, isOpneTask, isEditTask } from "../store/features/task/taskSlice.js";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";

const filters = [
  { label: "All Tasks", value: "all" },
  { label: "High Priority", value: "high" },
  { label: "Frontend", value: "frontend" },
  { label: "Architecture", value: "architecture" },
];

const columns = [
  { label: "Pending", status: "Pending", color: "bg-slate-400" },
  { label: "In Progress", status: "In Progress", color: "bg-sky-400" },
  { label: "Completed", status: "Completed", color: "bg-emerald-400" },
];

const KanbanBoard = () => {
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [density, setDensity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const { isToggleTask, editMode, refreshTasks } = useSelector(
    (state) => state.task
  );

  const getTasksData = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.tasks || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksData();
  }, [refreshTasks]);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (activeFilter === "high") {
        return task.priority === "High";
      }

      if (activeFilter === "frontend") {
        return task.tags?.some((tag) =>
          ["Frontend", "UI", "Design"].includes(tag)
        );
      }

      if (activeFilter === "architecture") {
        return task.tags?.some((tag) =>
          ["State", "Storage", "Architecture"].includes(tag)
        );
      }

      return true;
    });
  }, [tasks, activeFilter]);

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const todoCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  const openAddModal = (status) => {
    dispatch(isEditTask(null));
    dispatch(isOpneTask(true));
  };

  const handleEditTask = (task) => {
    dispatch(isOpneTask(false));
    dispatch(isEditTask(task._id));
  };

  const handleDeleteTask = async (task) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmDelete) return;

    setDeletingId(task._id);
    const success = await deleteTask(task._id);

    if (success) {
      setTasks((current) =>
        current.filter((item) => item._id !== task._id)
      );
      dispatch(refreshTaskList());
    }

    setDeletingId(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5">

      {/* Dashboard Overview */}
      <section className="rounded-xl border border-[#26364a]/50 bg-[#0b1c30] p-5 shadow-md">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Workspace Overview
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#d3e4fe]">
              Sprint Dashboard
            </h1>
            <p className="mt-1 text-sm text-[#918fa1]">
              Manage and track your team's tasks.
            </p>
          </div>

          <button
            onClick={() => openAddModal()}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            <span className="material-symbols-outlined">add</span>
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Total Tasks", value: tasks.length, icon: "task_alt", color: "text-indigo-400" },
            { title: "Pending", value: todoCount, icon: "pending_actions", color: "text-slate-400" },
            { title: "In Progress", value: progressCount, icon: "autorenew", color: "text-sky-400" },
            { title: "Completed", value: completedCount, icon: "check_circle", color: "text-emerald-400" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-[#26364a]/60 bg-[#102034] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#918fa1]">{item.title}</p>
                <span className={`material-symbols-outlined ${item.color}`}>
                  {item.icon}
                </span>
              </div>
              <p className="mt-2 text-3xl font-bold text-[#d3e4fe]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Sprint Progress */}
        <div className="mt-5 rounded-lg border border-[#26364a]/60 bg-[#102034] p-4">
          <div className="mb-2 flex justify-between gap-3">
            <span className="text-sm font-semibold text-[#d3e4fe]">
              Overall Completion
            </span>
            <span className="text-sm font-bold text-emerald-400">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#26364a]">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-[#918fa1]">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#26364a]/40 bg-[#0b1c30] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase text-[#918fa1]">
            Filter:
          </span>

          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`cursor-pointer rounded-full px-3 py-2 text-xs font-medium transition ${activeFilter === filter.value
                ? "bg-[#4f46e5] text-white"
                : "bg-[#102034] text-[#c7c4d8] hover:bg-[#26364a]"
                }`}
            >
              {filter.label}
              {filter.value === "all" && ` (${tasks.length})`}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDensity((current) => !current)}
          title="Toggle board density"
          className="cursor-pointer rounded-md bg-[#102034] p-2 text-[#c7c4d8] hover:bg-[#26364a]"
        >
          <span className="material-symbols-outlined">
            {density ? "density_small" : "density_medium"}
          </span>
        </button>
      </section>

      {/* Kanban Board */}
      {loading ? (
        <div className="rounded-xl border border-[#26364a] bg-[#0b1c30] p-10 text-center text-[#c7c4d8]">
          Loading tasks...
        </div>
      ) : (
        <section className={`grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3 ${density ? "gap-3" : ""}`}>
          {columns.map((column) => (
            <TaskColumn
              key={column.status}
              status={column.status}
              tasks={visibleTasks.filter(
                (task) => task.status === column.status
              )}
              onTaskClick={handleEditTask}
              onAddTask={openAddModal}
            />
          ))}
        </section>
      )}

      {/* Existing TaskForm */}
      {(isToggleTask || editMode) && <TaskForm />}
    </div>
  );
};

export default KanbanBoard;
