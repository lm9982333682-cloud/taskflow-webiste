import { useState } from "react";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { isOpneTask } from "../store/features/task/taskSlice";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState("");
  const [priority, setPriority] = useState("Priority");
  const [status, setStatus] = useState("Status");
  const [profileOpen, setProfileOpen] = useState(false);

  const { isToggleTask, editMode } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      localStorage.removeItem("token");

      setProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);

      // Local session clear even if API request fails
      localStorage.removeItem("token");
      setProfileOpen(false);
      navigate("/login");
    }
  };

  const dropdowns = [
    {
      key: "priority",
      label: priority,
      icon: "flag",
      options: ["All Priorities", "High", "Medium", "Low"],
      onSelect: (value) =>
        setPriority(value === "All Priorities" ? "Priority" : value),
    },
    {
      key: "status",
      label: status,
      icon: "tune",
      options: ["All Statuses", "Todo", "In Progress", "Completed"],
      onSelect: (value) =>
        setStatus(value === "All Statuses" ? "Status" : value),
    },
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-[#26364a]/70 bg-[#031427]/95 px-4 backdrop-blur-xl lg:left-[240px] lg:px-6">
        <div className="flex h-full items-center gap-3">
          <div className="hidden min-w-max items-center gap-2 xl:flex">
            <span className="material-symbols-outlined text-lg text-[#918fa1]">
              folder_open
            </span>
            <span className="text-sm text-[#918fa1]">Workspace</span>
            <span className="text-sm text-[#464555]">/</span>
            <span className="text-sm font-semibold text-[#d3e4fe]">
              Sprint Board
            </span>
          </div>

          <div className="relative min-w-0 flex-1 xl:mx-auto xl:max-w-xl">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-2 text-lg text-[#918fa1]">
              search
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks by title... (Cmd+K)"
              className="h-9 w-full rounded-lg border border-[#26364a] bg-[#000f21] pl-9 pr-3 text-sm text-[#d3e4fe] outline-none placeholder:text-[#918fa1] focus:border-[#5146e5] focus:ring-1 focus:ring-[#5146e5]"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {dropdowns.map((dropdown) => (
              <div className="relative hidden sm:block" key={dropdown.key}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(
                      openMenu === dropdown.key ? "" : dropdown.key
                    )
                  }
                  className="flex h-9 cursor-pointer items-center gap-1 rounded-lg border border-[#26364a] bg-[#102034] px-2 text-sm text-[#d3e4fe] transition hover:bg-[#1b2b3f] sm:px-3"
                >
                  <span className="material-symbols-outlined text-base">
                    {dropdown.icon}
                  </span>
                  <span>{dropdown.label}</span>
                </button>

                {openMenu === dropdown.key && (
                  <div className="absolute right-0 top-11 z-50 w-44 rounded-lg border border-[#34445a] bg-[#102034] p-1 shadow-xl">
                    {dropdown.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          dropdown.onSelect(option);
                          setOpenMenu("");
                        }}
                        className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-[#d3e4fe] hover:bg-[#26364a]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => dispatch(isOpneTask(true))}
              className="flex h-9 cursor-pointer items-center gap-1 rounded-lg bg-[#4f46e5] px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6258f5] sm:px-4"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="hidden sm:inline">Add Task</span>
            </button>

            {/* Profile Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Profile"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#c3c0ff] text-[#1d00a5] transition hover:ring-2 hover:ring-[#5146e5]"
              >
                <span className="material-symbols-outlined text-xl">
                  person
                </span>
              </button>

              {/* Profile Popup */}
              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-[#26364a] bg-[#102034] shadow-xl">
                  <div className="border-b border-[#26364a] px-4 py-3">
                    <p className="text-sm font-semibold text-[#d3e4fe]">
                      My Account
                    </p>
                    <p className="mt-1 text-xs text-[#918fa1]">
                      Manage your account
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-[#26364a]"
                  >
                    <span className="material-symbols-outlined text-lg">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {(isToggleTask || editMode) && <TaskForm />}
    </>
  );
};

export default Navbar;