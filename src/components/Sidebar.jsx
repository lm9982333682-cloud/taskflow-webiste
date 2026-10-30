
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const Sidebar = () => {

  const { user } = useSelector(state => state.auth);

  const links = [
    { name: "Board", path: "/", icon: "view_kanban", end: true },
    { name: "All Tasks", path: "/tasks", icon: "checklist" },
    { name: "Settings", path: "/settings", icon: "settings" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[240px] flex-col justify-between border-r border-[#26364a]/70 bg-[#0b1c30] lg:flex">
      <div>
        <div className="flex h-16 items-center justify-between border-b border-[#26364a]/60 px-5">
          <NavLink to="/" className="flex cursor-pointer items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5146e5] text-white">
              <span className="material-symbols-outlined">view_kanban</span>
            </span>
            <span className="font-serif text-lg font-bold tracking-tight text-[#d3e4fe]">
              TaskFlow
            </span>
          </NavLink>

          <span className="rounded border border-[#34445a] bg-[#1b2b3f] px-1.5 py-0.5 text-[11px] text-[#c7c4d8]">
            v1.0
          </span>
        </div>

        <div className="p-3">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#918fa1]">
            Workspace
          </p>

          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive
                    ? "bg-[#4f46e5] font-semibold text-white"
                    : "text-[#c7c4d8] hover:bg-[#102034] hover:text-[#d3e4fe]"
                  }`
                }
              >
                <span className="material-symbols-outlined text-xl">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-[#26364a]/60 bg-[#000f21]/50 p-3">
        <div className="flex items-center justify-between rounded border border-[#26364a]/70 bg-[#102034]/80 px-2 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4edea3]" />

            <div>
              <p className="text-xs font-semibold text-[#d3e4fe]">
                {user.name}
              </p>
              <p className="text-[10px] text-[#918fa1]">
                {user.role}
              </p>
            </div>
          </div>

          <span className="material-symbols-outlined text-base text-[#4edea3]">
            cloud_done
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
