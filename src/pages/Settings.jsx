
import { useState } from "react";
import { useForm } from "react-hook-form";

const inputClass =
  "mt-2 w-full rounded-lg border border-[#26364a] bg-[#000f21] px-3 py-2.5 text-sm text-[#d3e4fe] outline-none focus:border-indigo-500";

const errorClass = "mt-1 text-xs text-[#ffb4ab]";

const Settings = () => {
  const [profileSaved, setProfileSaved] = useState(false);
  const [workspaceSaved, setWorkspaceSaved] = useState(false);
  const [notificationsSaved, setNotificationsSaved] = useState(false);

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("taskflow_notifications");
      return saved
        ? JSON.parse(saved)
        : {
            taskUpdates: true,
            dueDates: true,
            teamActivity: false,
            weeklySummary: true,
          };
    } catch {
      return {
        taskUpdates: true,
        dueDates: true,
        teamActivity: false,
        weeklySummary: true,
      };
    }
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    watch: watchProfile,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: (() => {
      try {
        return JSON.parse(localStorage.getItem("taskflow_profile")) || {
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "Frontend Developer",
        };
      } catch {
        return {
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "Frontend Developer",
        };
      }
    })(),
    mode: "onChange",
  });

  const {
    register: registerWorkspace,
    handleSubmit: handleWorkspaceSubmit,
    formState: { errors: workspaceErrors },
  } = useForm({
    defaultValues: (() => {
      try {
        return JSON.parse(localStorage.getItem("taskflow_workspace")) || {
          name: "Engineering Team",
          timezone: "Asia/Kolkata",
        };
      } catch {
        return {
          name: "Engineering Team",
          timezone: "Asia/Kolkata",
        };
      }
    })(),
    mode: "onChange",
  });

  const profile = watchProfile();

  const initials = (profile.name || "User")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const updateProfile = (data) => {
    try {
      localStorage.setItem(
        "taskflow_profile",
        JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          role: data.role.trim(),
        })
      );

      setProfileSaved(true);
    } catch {
      setProfileSaved(false);
      alert("Unable to save profile settings in this browser.");
    }
  };

  const updateWorkspace = (data) => {
    try {
      localStorage.setItem("taskflow_workspace", JSON.stringify(data));
      setWorkspaceSaved(true);
    } catch {
      setWorkspaceSaved(false);
      alert("Unable to save workspace settings in this browser.");
    }
  };

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setNotificationsSaved(false);
  };

  const saveNotifications = () => {
    try {
      localStorage.setItem(
        "taskflow_notifications",
        JSON.stringify(notifications)
      );
      setNotificationsSaved(true);
    } catch {
      setNotificationsSaved(false);
      alert("Unable to save notification preferences.");
    }
  };

  const sections = [
    {
      key: "taskUpdates",
      title: "Task updates",
      description: "Get notified when tasks assigned to you change.",
    },
    {
      key: "dueDates",
      title: "Due date reminders",
      description: "Receive reminders about upcoming deadlines.",
    },
    {
      key: "teamActivity",
      title: "Team activity",
      description: "Get updates about activity across your workspace.",
    },
    {
      key: "weeklySummary",
      title: "Weekly summary",
      description: "Receive a summary of your team's weekly progress.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#031427] px-4 py-6 text-[#d3e4fe] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* Heading */}
        <header>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
              <span className="material-symbols-outlined text-2xl text-indigo-300">
                settings
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="mt-1 text-sm text-[#918fa1]">
                Manage your profile, notifications, and workspace preferences.
              </p>
            </div>
          </div>
        </header>

        {/* Profile Settings */}
        <section className="overflow-hidden rounded-xl border border-[#26364a]/60 bg-[#0b1c30]">
          <div className="border-b border-[#26364a] px-5 py-4">
            <h2 className="font-semibold">Profile Settings</h2>
            <p className="mt-1 text-xs text-[#918fa1]">
              Update your personal information.
            </p>
          </div>

          <form
            onSubmit={handleProfileSubmit(updateProfile)}
            onChange={() => setProfileSaved(false)}
            className="space-y-5 p-5"
            noValidate
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 text-xl font-bold text-indigo-200">
                {initials}
              </div>

              <div>
                <p className="font-semibold">{profile.name || "Your Name"}</p>
                <p className="mt-1 text-xs text-[#918fa1]">
                  {profile.role || "Job title"}
                </p>
                <span className="mt-2 inline-flex rounded-full bg-emerald-400/10 px-2 py-1 text-[11px] text-emerald-300">
                  Active account
                </span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm text-[#c7c4d8]">
                Full name
                <input
                  {...registerProfile("name", {
                    required: "Full name is required.",
                    minLength: {
                      value: 2,
                      message: "Name must contain at least 2 characters.",
                    },
                    validate: (value) =>
                      value.trim().length >= 2 || "Enter a valid name.",
                  })}
                  className={inputClass}
                  autoComplete="name"
                />
                {profileErrors.name && (
                  <p className={errorClass}>{profileErrors.name.message}</p>
                )}
              </label>

              <label className="block text-sm text-[#c7c4d8]">
                Email address
                <input
                  {...registerProfile("email", {
                    required: "Email address is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                      message: "Enter a valid email address.",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                />
                {profileErrors.email && (
                  <p className={errorClass}>{profileErrors.email.message}</p>
                )}
              </label>

              <label className="block text-sm text-[#c7c4d8] sm:col-span-2">
                Job title
                <input
                  {...registerProfile("role", {
                    required: "Job title is required.",
                    validate: (value) =>
                      value.trim().length > 0 || "Enter a job title.",
                  })}
                  className={inputClass}
                />
                {profileErrors.role && (
                  <p className={errorClass}>{profileErrors.role.message}</p>
                )}
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#26364a] pt-4">
              {profileSaved && (
                <p role="status" className="mr-auto text-xs text-emerald-300">
                  ✓ Profile saved successfully.
                </p>
              )}
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Save Profile
              </button>
            </div>
          </form>
        </section>

        {/* Notifications */}
        <section className="overflow-hidden rounded-xl border border-[#26364a]/60 bg-[#0b1c30]">
          <div className="border-b border-[#26364a] px-5 py-4">
            <h2 className="font-semibold">Notifications</h2>
            <p className="mt-1 text-xs text-[#918fa1]">
              Choose which notifications you want to receive.
            </p>
          </div>

          <div className="divide-y divide-[#26364a]/70 px-5">
            {sections.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#918fa1]">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[item.key]}
                  aria-label={item.title}
                  onClick={() => toggleNotification(item.key)}
                  className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition ${
                    notifications[item.key]
                      ? "bg-indigo-500"
                      : "bg-[#34445a]"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                      notifications[item.key] ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#26364a] px-5 py-4">
            {notificationsSaved && (
              <p role="status" className="mr-auto text-xs text-emerald-300">
                ✓ Preferences saved.
              </p>
            )}
            <button
              type="button"
              onClick={saveNotifications}
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Save Preferences
            </button>
          </div>
        </section>

        {/* Workspace */}
        <section className="overflow-hidden rounded-xl border border-[#26364a]/60 bg-[#0b1c30]">
          <div className="border-b border-[#26364a] px-5 py-4">
            <h2 className="font-semibold">Workspace Settings</h2>
            <p className="mt-1 text-xs text-[#918fa1]">
              Configure your team's workspace.
            </p>
          </div>

          <form
            onSubmit={handleWorkspaceSubmit(updateWorkspace)}
            onChange={() => setWorkspaceSaved(false)}
            className="space-y-5 p-5"
            noValidate
          >
            <label className="block text-sm text-[#c7c4d8]">
              Workspace name
              <input
                {...registerWorkspace("name", {
                  required: "Workspace name is required.",
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Workspace name cannot be empty.",
                })}
                className={inputClass}
              />
              {workspaceErrors.name && (
                <p className={errorClass}>{workspaceErrors.name.message}</p>
              )}
            </label>

            <label className="block text-sm text-[#c7c4d8]">
              Time zone
              <select
                {...registerWorkspace("timezone", {
                  required: "Please select a time zone.",
                })}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="Asia/Kolkata">India Standard Time</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="Europe/London">London Time</option>
              </select>
              {workspaceErrors.timezone && (
                <p className={errorClass}>
                  {workspaceErrors.timezone.message}
                </p>
              )}
            </label>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#26364a] pt-4">
              {workspaceSaved && (
                <p role="status" className="mr-auto text-xs text-emerald-300">
                  ✓ Workspace settings saved.
                </p>
              )}
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Save Workspace
              </button>
            </div>
          </form>
        </section>

        {/* About */}
        <section className="flex flex-col justify-between gap-3 rounded-xl border border-[#26364a]/50 bg-[#0b1c30] p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-semibold">TaskFlow</h2>
            <p className="mt-1 text-xs text-[#918fa1]">
              Project management workspace · Demo version
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#1b2b3f] px-3 py-1.5 text-xs text-[#c7c4d8]">
            Version 1.0.0
          </span>
        </section>
      </div>
    </main>
  );
};

export default Settings;