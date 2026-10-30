
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEditTask, isOpneTask, refreshTaskList } from "../store/features/task/taskSlice";
import { deleteTask, getTasks } from "../service/taskService.js";
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx'

const AllTasks = () => {
  const dispatch = useDispatch();


  const [taskToDelete, setTaskToDelete] = useState(null);

  const [tasksData, setTasksData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);

  const { refreshTasks } = useSelector((state) => state.task);

  const getTasksData = async () => {
    try {
      const res = await getTasks();
      if (res.success) {
        setTasksData(res.tasks || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasksData();
  }, [refreshTasks]);

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    const success = await deleteTask(id);

    if (success) {
      setTasksData((prev) => prev.filter((task) => task._id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const filteredTasks = useMemo(() => {
    return tasksData.filter((task) => {
      const searchMatch =
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase()) ||
        task._id?.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || task.status === statusFilter;

      const priorityMatch =
        priorityFilter === "All" || task.priority === priorityFilter;

      return searchMatch && statusMatch && priorityMatch;
    });
  }, [tasksData, search, statusFilter, priorityFilter]);

  const todoCount = tasksData.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressCount = tasksData.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedCount = tasksData.filter(
    (task) => task.status === "Completed"
  ).length;

  const priorityStyle = {
    High: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    Medium: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    Low: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  };

  const statusStyle = {
    Pending: "bg-[#26364a] text-[#c7c4d8]",
    "In Progress": "bg-sky-400/10 text-sky-300",
    Completed: "bg-emerald-400/10 text-emerald-300",
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const visibleIds = filteredTasks.map((task) => task._id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !visibleIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleBatchDelete = async () => {
    if (!selectedIds.length) return;

    const confirmDelete = window.confirm(
      `Delete ${selectedIds.length} selected tasks?`
    );

    if (!confirmDelete) return;

    for (const id of selectedIds) {
      await deleteTask(id);
    }

    setSelectedIds([]);
    getTasksData();
  };



  const handleConfirmDelete = async (task) => {
    const success = await deleteTask(task._id);

    if (success) {
      setTasksData((prev) =>
        prev.filter((item) => item._id !== task._id)
      );

      setSelectedIds((prev) =>
        prev.filter((id) => id !== task._id)
      );

      dispatch(refreshTaskList());
    }

    setTaskToDelete(null);
  };




  return (
    <>

      <main className="relative min-h-screen w-full overflow-hidden bg-[#031427] px-4 py-6 text-[#d3e4fe] sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-16 right-1/4 h-48 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-20 h-32 w-72 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-6">

          {/* Page Header */}
          <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold tracking-tight sm:text-4xl">
                  All Tasks
                </h1>

                <span className="flex items-center gap-2 rounded-full bg-[#1b2b3f] px-3 py-1.5 font-mono text-xs text-[#c3c0ff]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
                  {tasksData.length} Tasks
                </span>

                <span className="rounded bg-[#000f21] px-2 py-1 text-[11px] text-[#918fa1]">
                  Task Directory
                </span>
              </div>

              <p className="mt-2 text-sm text-[#c7c4d8]">
                Manage, filter, and track all your engineering tasks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const csvRows = [
                    ["Title", "Status", "Priority", "Due Date"],
                    ...filteredTasks.map((task) => [
                      task.title,
                      task.status,
                      task.priority,
                      task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-IN")
                        : "",
                    ]),
                  ];

                  const csv = csvRows
                    .map((row) =>
                      row.map((value) =>
                        `"${String(value ?? "").replace(/"/g, '""')}"`
                      ).join(",")
                    )
                    .join("\n");

                  const blob = new Blob([csv], {
                    type: "text/csv;charset=utf-8;",
                  });

                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "taskflow-tasks.csv";
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1b2b3f] px-4 py-2.5 text-sm hover:bg-[#26364a]"
              >
                <span className="material-symbols-outlined text-lg">
                  file_download
                </span>
                Export CSV
              </button>

              <button
                type="button"
                disabled={!selectedIds.length}
                onClick={handleBatchDelete}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1b2b3f] px-4 py-2.5 text-sm hover:bg-[#26364a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
                Batch Delete ({selectedIds.length})
              </button>

              <button
                onClick={() => {
                  dispatch(isEditTask(null));
                  dispatch(isOpneTask(true));
                }}
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#6258f5]"
              >
                <span className="material-symbols-outlined text-lg">
                  add_task
                </span>
                Add Task
              </button>
            </div>
          </section>

          {/* Metrics */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                label: "Total Tasks",
                count: tasksData.length,
                icon: "checklist",
                color: "text-[#c3c0ff]",
              },
              {
                label: "In Progress",
                count: progressCount,
                icon: "autorenew",
                color: "text-sky-300",
              },
              {
                label: "PANDING",
                count: todoCount,
                icon: "pending_actions",
                color: "text-amber-300",
              },
              {
                label: "Completed",
                count: completedCount,
                icon: "task_alt",
                color: "text-emerald-300",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-xl border border-[#26364a]/40 bg-[#0b1c30] p-4 shadow-sm sm:p-5"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#918fa1]">
                    {metric.label}
                  </p>
                  <p className={`mt-2 text-2xl font-bold ${metric.color}`}>
                    {metric.count}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#102034]">
                  <span className={`material-symbols-outlined ${metric.color}`}>
                    {metric.icon}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Search and Filters */}
          <section className="flex flex-col gap-3 rounded-xl border border-[#26364a]/50 bg-[#0b1c30] p-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-[#918fa1]">
                search
              </span>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks, descriptions, IDs..."
                className="w-full rounded-lg border border-[#26364a] bg-[#000f21] py-2.5 pl-10 pr-3 text-sm text-[#d3e4fe] outline-none placeholder:text-[#918fa1] focus:border-indigo-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer rounded-lg border border-[#26364a] bg-[#000f21] px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="cursor-pointer rounded-lg border border-[#26364a] bg-[#000f21] px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="All">All Priorities</option>
              {["High", "Medium", "Low"].map((priority) => (
                <option key={priority} value={priority}>
                  {priority} Priority
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setPriorityFilter("All");
              }}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-[#c7c4d8] hover:bg-[#26364a]"
            >
              Clear filters
            </button>
          </section>

          {/* Task Table */}
          <section className="overflow-hidden rounded-xl border border-[#26364a]/60 bg-[#0b1c30]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26364a] px-4 py-4 sm:px-5">
              <div>
                <h2 className="font-semibold">Task Directory</h2>
                <p className="mt-1 text-xs text-[#918fa1]">
                  Showing {filteredTasks.length} of {tasksData.length} tasks
                </p>
              </div>

              <span className="text-xs text-[#918fa1]">
                {selectedIds.length} selected
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-[#102034] text-[11px] uppercase tracking-wider text-[#918fa1]">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select all visible tasks"
                        checked={
                          filteredTasks.length > 0 &&
                          filteredTasks.every((task) =>
                            selectedIds.includes(task._id)
                          )
                        }
                        onChange={toggleSelectAll}
                        className="cursor-pointer accent-indigo-500"
                      />
                    </th>
                    <th className="px-4 py-3">Task</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Due Date</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#26364a]/70">
                  {filteredTasks.map((task) => (
                    <tr
                      key={task._id}
                      className="transition hover:bg-[#102034]/70"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(task._id)}
                          onChange={() => toggleSelect(task._id)}
                          className="cursor-pointer accent-indigo-500"
                        />
                      </td>

                      <td className="max-w-xs px-4 py-4">
                        <p className="font-semibold text-[#d3e4fe]">
                          {task.title}
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-[#918fa1]">
                          {task._id}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs ${statusStyle[task.status] ||
                            "bg-[#26364a] text-[#c7c4d8]"
                            }`}
                        >
                          {task.status === "Pending" ? "Todo" : task.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs ${priorityStyle[task.priority] ||
                            "border-[#26364a] text-[#c7c4d8]"
                            }`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-xs text-[#c7c4d8]">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString("en-IN")
                          : "No due date"}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            title="Edit task"
                            onClick={() => {
                              dispatch(isOpneTask(false));
                              dispatch(isEditTask(task._id));
                            }}
                            className="cursor-pointer rounded-md p-2 text-[#918fa1] hover:bg-[#26364a] hover:text-white"
                          >
                            <span className="material-symbols-outlined text-lg">
                              edit
                            </span>
                          </button>

                          <button
                            type="button"

                            onClick={() => setTaskToDelete(task)}

                            title="Delete task"
                            className="cursor-pointer rounded-md p-2 text-[#918fa1] hover:bg-rose-500/10 hover:text-rose-300"
                          >
                            <span className="material-symbols-outlined text-lg">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-16 text-center">
                        <span className="material-symbols-outlined text-4xl text-[#64748b]">
                          search_off
                        </span>
                        <p className="mt-3 font-semibold">No tasks found</p>
                        <p className="mt-1 text-sm text-[#918fa1]">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <DeleteConfirmModal
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AllTasks;
