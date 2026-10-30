
import TaskCard from "./TaskCard";

const columnStyles = {
 
  Pending: {
    dot: "bg-[#918fa1]",
    title: "Pending",
  },
  "In Progress": {
    dot: "bg-sky-400",
    title: "In Progress",
  },
  Completed: {
    dot: "bg-emerald-400",
    title: "Completed",
  },
};






const TaskColumn = ({ status, tasks, onTaskClick, onAddTask }) => {
  const style = columnStyles[status];

  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#26364a]/40 bg-[#0b1c30] p-3 shadow-sm">
      <div className="flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />

          <h2 className="text-lg font-semibold text-[#d3e4fe]">
            {style.title}
          </h2>

          <span className="rounded-full bg-[#26364a] px-2 py-0.5 font-mono text-xs text-[#c7c4d8]">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          title={`Add task to ${status}`}
          aria-label={`Add task to ${status}`}
          onClick={() => onAddTask(status)}
          className="cursor-pointer rounded p-1 text-[#918fa1] transition hover:bg-[#26364a] hover:text-white"
        >
          <span className="material-symbols-outlined text-xl">
            {status === "Completed" ? "inventory_2" : "add"}
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onClick={onTaskClick}
          />
        ))}

        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-[#34445a] px-3 py-8 text-center">
            <span className="material-symbols-outlined mb-2 text-2xl text-[#64748b]">
              inbox
            </span>
            <p className="text-sm text-[#918fa1]">No tasks found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
