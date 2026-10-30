# TaskFlow – Frontend Application

## 1. Project Overview

TaskFlow is a modern task management web application built with React.

It provides a clean dashboard where users can organize their work, manage tasks, track progress, and manage task priorities through a Kanban board and All Tasks page.

The frontend communicates with the TaskFlow backend through REST APIs.

## 2. Technologies Used

- React 19 – Frontend library
- Vite – Development server and build tool
- Tailwind CSS 4 – UI styling
- React Router – Client-side routing
- Redux Toolkit – Global state management
- React Redux – Connecting Redux with React
- Axios – API communication
- React Hook Form – Form handling and validation
- React Toastify – Success and error notifications
- Lucide React – Icons

## 3. Project Structure

```text
taskflow/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── axiosInstance.js
│   │
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskColumn.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskModal.jsx
│   │
│   ├── data/
│   │   ├── tasks.js
│   │   └── users.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useAuthHook.js
│   │   └── useTasks.js
│   │
│   ├── layout/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── AllTasks.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   └── router.jsx
│   │
│   ├── service/
│   │   └── taskService.js
│   │
│   ├── store/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   └── authSlice.js
│   │   │   └── task/
│   │   │       └── taskSlice.js
│   │   │
│   │   └── store.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

## 4. Installation and Setup

### Step 1: Open Frontend Folder

```bash
cd taskflow
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

### Step 4: Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 5. Frontend Pages

### 5.1 Login Page

Route:

```text
/login
```

Features:
- User email and password login.
- Password visibility control.
- Form handling with React Hook Form.
- Login API integration.
- Authentication state management.

### 5.2 Register Page

Route:

```text
/register
```

Features:
- New user registration.
- Name, email, password, and confirm-password fields.
- Password visibility controls.
- Password strength indicator.
- Form validation.
- Registration API integration.

### 5.3 Kanban Board

Route:

```text
/
```

Features:
- Displays tasks in separate status columns.
- Pending tasks.
- In Progress tasks.
- Completed tasks.
- Task priority display.
- Task progress overview.
- Edit and delete task actions.
- Add new task functionality.

### 5.4 All Tasks

Route:

```text
/tasks
```

Features:
- Displays tasks in a directory/table layout.
- Search tasks by title, description, and ID.
- Filter tasks by status.
- Filter tasks by priority.
- Select individual tasks.
- Select multiple tasks.
- Batch delete functionality.
- Export task data to CSV.
- Create, edit, and delete tasks.
- Delete confirmation modal.

### 5.5 Settings Page

Route:

```text
/settings
```

Provides the settings page interface for the application.

### 5.6 Not Found Page

Route:

```text
*
```

Displays a fallback page when the requested route does not exist.

## 6. Main Components

| Component | Responsibility |
|---|---|
| Navbar | Top navigation, search, filters, profile and task form |
| Sidebar | Main application navigation |
| MainLayout | Shared layout for dashboard pages |
| TaskCard | Displays individual task information |
| TaskColumn | Displays tasks grouped by status |
| TaskForm | Creates and edits tasks |
| DeleteConfirmModal | Confirms task deletion |

## 7. State Management

TaskFlow uses Redux Toolkit for global state management.

### Auth Slice

File:

```text
src/store/features/auth/authSlice.js
```

Manages:
- Logged-in user information.
- Access token.
- Authentication status.
- Authentication loading state.
- Logout and auth reset actions.

### Task Slice

File:

```text
src/store/features/task/taskSlice.js
```

Manages:
- Task form visibility.
- Current task edit mode.
- Task list refresh state.

## 8. API Integration

API configuration:

```text
src/api/axiosInstance.js
```

Base URL:

```text
http://localhost:4545/api
```

Axios configuration includes:
- `withCredentials: true` for cookie-based authentication.
- Authorization header using the Redux access token.
- Centralized API configuration.

Task API service:

```text
src/service/taskService.js
```

The frontend uses backend endpoints for:
- Creating tasks.
- Fetching all tasks.
- Fetching an individual task.
- Updating tasks.
- Deleting tasks.

Authentication requests are handled through the authentication hook and API instance.

## 9. Task Management Workflow

### Create Task

1. User clicks Add Task.
2. Task form opens.
3. User enters task details.
4. React Hook Form handles form submission.
5. Frontend sends a POST request to `/tasks`.
6. Backend saves the task in MongoDB.
7. Redux refresh action updates the task list.

### Edit Task

1. User selects Edit.
2. Selected task ID is stored in Redux.
3. Existing task details are fetched.
4. Task form is populated.
5. User updates task information.
6. Frontend sends a PUT request to `/tasks/:id`.
7. Task list refreshes after success.

### Delete Task

1. User clicks the Delete button.
2. Delete confirmation modal opens.
3. User confirms deletion.
4. Frontend sends a DELETE request to `/tasks/:id`.
5. Task is removed from the visible list after successful response.

## 10. Task Status and Priority

### Status

- Pending – Displayed as Todo where appropriate.
- In Progress
- Completed

### Priority

- Low
- Medium
- High

## 11. UI Design

TaskFlow uses a modern dark dashboard design.

Main design characteristics:
- Dark navy background.
- Indigo primary action buttons.
- Responsive layouts.
- Task status and priority indicators.
- Cards, tables, and modal interfaces.
- Clear navigation and dashboard sections.

## 12. Project Purpose

The purpose of TaskFlow is to make everyday task management easier.

Users can:
- Organize daily work.
- Track task progress.
- Manage deadlines.
- Set task priorities.
- View work through a Kanban board.
- Search and filter tasks.
- Export task data.

TaskFlow provides a centralized interface to manage tasks and monitor work progress.