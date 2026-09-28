# TypeMaster

TypeMaster is a browser-based typing speed test built with React, TypeScript, and Vite. Type passages at your own pace or race a timer, then review your words per minute (WPM) and accuracy.

## Features

- Easy, medium, and hard passage sets, with ten passages in each difficulty.
- Timed tests at 15, 30, 60, or 120 seconds, plus a passage mode with no countdown.
- Live WPM, accuracy, remaining time, and character-level typing feedback.
- Result summaries and a session history with WPM, accuracy, date, and mode.
- Light and dark themes, with optional typing and feedback sounds.
- Difficulty, theme, sound preference, and test history saved in browser storage.
- Responsive layout for desktop and mobile keyboards.

## Requirements

- Node.js 24 (the version used by the project's Docker images).
- npm, included with Node.js.

## Run Locally

Install the dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173>.

## Available Scripts

| Command           | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Start the development server with hot module replacement.            |
| `npm run build`   | Type-check the application and create a production build in `dist/`. |
| `npm run lint`    | Run ESLint across the project.                                       |
| `npm run preview` | Serve the production build locally for a preview.                    |

## Use Docker

Docker Compose provides separate development and production services.

Start the development server on port 5173:

```sh
docker compose up --build react-dev
```

Build and serve the production app on port 8080:

```sh
docker compose up --build react-prod
```

Open <http://localhost:5173> for development or <http://localhost:8080> for production. Stop either service with `Ctrl+C`; use `docker compose down` to remove the Compose containers.

## Taking a Test

Choose a difficulty and test duration before starting. Select **Start Typing Test** or click the passage, then type the displayed text. A timed test starts when you enter the first character and ends when its timer runs out; passage mode ends when the passage is complete. The results screen shows your WPM, accuracy, and typed-character count. Use **Restart Test** during a run or the results action to continue to another passage.

Your settings and completed-test history are stored in this browser. Clearing the browser's site data removes them.

## Tech Stack

- React 19 and TypeScript
- Vite 8
- Redux Toolkit and Redux Persist
- Tailwind CSS 4
- Base UI React components and Lucide icons
