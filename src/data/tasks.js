
export const tasks = [
    {
        id: "ENG-1082",
        title: "Implement LocalStorage sync layer",
        description:
            "Write debounced persistence middleware handling concurrent browser tabs and schema hydration.",
        status: "Todo",
        priority: "High",
        tags: ["Storage", "State"],
        dueDate: "Oct 24",
        checklist: "2/5",
        assignees: ["JD"],
    },
    {
        id: "ENG-1085",
        title: "Design empty state illustrations",
        description:
            "Create clear, friendly empty states for new projects and filtered board views.",
        status: "Todo",
        priority: "Low",
        tags: ["Design", "UI"],
        dueDate: "Oct 25",
        checklist: "1/3",
        assignees: ["AK"],
    },
    {
        id: "ENG-1088",
        title: "Form input validation schema",
        description:
            "Define reusable validation rules and accessible inline error messages for task forms.",
        status: "Todo",
        priority: "Medium",
        tags: ["Forms", "Validation"],
        dueDate: "Oct 27",
        checklist: "3/6",
        assignees: ["ML"],
    },
    {
        id: "ENG-1090",
        title: "Refactor Kanban column drag and drop",
        description:
            "Improve touch event handling and optimistic UI updates during column reordering.",
        status: "In Progress",
        priority: "High",
        tags: ["Frontend", "DnD"],
        dueDate: "Oct 25",
        checklist: "4/7",
        assignees: ["JD", "AK"],
    },
    {
        id: "ENG-1091",
        title: "Accessible keyboard navigation",
        description:
            "Support keyboard navigation on task cards with Enter to expand and Space to initiate drag mode.",
        status: "In Progress",
        priority: "Medium",
        tags: ["Accessibility", "UX"],
        dueDate: "Oct 26",
        comments: 4,
        assignees: ["ML"],
    },
    {
        id: "ENG-1054",
        title: "Setup Tailwind CSS design tokens",
        description:
            "Mapped surface palette hierarchy, token typography, and shadow elevations.",
        status: "Completed",
        priority: "Low",
        tags: ["Tailwind", "Design"],
        completedDate: "Oct 20",
        badge: "Verified",
    },
    {
        id: "ENG-1060",
        title: "Brand identity and SVG logo icon",
        description:
            "Integrated scalable vector task glyph in application shell navigation.",
        status: "Completed",
        priority: "Low",
        tags: ["Branding", "SVG"],
        completedDate: "Oct 21",
        badge: "Merged",
    },
    {
        id: "ENG-1068",
        title: "Dark mode color contrast audit",
        description:
            "Validated contrast ratio across surface levels and interactive states.",
        status: "Completed",
        priority: "Low",
        tags: ["Accessibility", "Theme"],
        completedDate: "Oct 23",
        badge: "WCAG AAA",
    },
];

export const taskStatuses = [
    "Todo",
    "In Progress",
    "Completed",
];
