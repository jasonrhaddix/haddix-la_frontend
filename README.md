# Haddix.LA – Setup Instructions

This project includes a **Node.js + Express** backend and a **Vue 3 + Vite + Vuetify** frontend.\
Follow these instructions to get both environments running locally, then deploy using Heroku.

### External Services

- AWS : _S3, Cognito, IAM_
- Mongo Atlas : _Live hosting of Mongo Database_
- .LA: _Registrar_

---

## 🖥️ Backend Setup (Node.js / Express / MongoDB)

### Requirements

- Node.js (v18+ recommended)
- Yarn (v1.22+)
- MongoDB (local instance or Atlas)

### Installation

1. **Clone the repository**

```bash
git clone <github-repo-url>
cd ./<backend>
```

2. **Install dependencies**

```bash
yarn install
```

3. **Environment variables**

Create a `.env` file in the `/backend` folder based on `.env.example`:

```bash
cp .env.example .env
```

Fill out your `.env`:

```env
#JWT
JWT_SECRET=''

#MongoDB
MONGO_URI=

#AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
```

4. **Start the backend server**

```bash
yarn dev
```

Backend will run at:\
`http://localhost:5000/`

---

## 🌐 Frontend Setup (Vue 3 / Vite / Vuetify)

### Requirements

- Node.js (v18+)
- Yarn

### Installation

1. **Navigate to the frontend**

```bash
cd ../<frontend>
```

2. **Install frontend dependencies**

```bash
yarn install
```

3. **Environment variables**

Create a `.env` file in the `/frontend` folder based on `.env.example` (optional):

```bash
cp .env.example .env
```

Fill out your `.env`:

```env
#AWS
VITE_AWS_BUCKET_REGION=""
VITE_AWS_BUCKET_IDENTITY_POOL_ID=""
```

4. **Start the Vite dev server**

```bash
yarn dev
```

Frontend will run at:\
`http://localhost:5173/`

---

## Creating users (Postman)
```
1. Register a New User
	•	Method: POST
	•	URL: http://localhost:5000/api/auth/register
	•	Body (JSON):

    {
      "email": "test@example.com",
      "password": "YourSecurePassword"
    }
```

---

## 📚 Project Structure Overview

```
/backend
  /src
    /controllers
    /models
    /routes
    /utils
  server.js
  .env

/frontend
  /src
    /components
    /views
    /stores (Pinia)
    /utils
  /public
  vite.config.js
  .env
```

---

## 🚀 Deploying with Heroku CLI

### 1. Install Heroku CLI (via Homebrew)

```bash
brew tap heroku/brew && brew install heroku
```

Check install:

```bash
heroku --version
```

### 2. Log into Heroku

```bash
heroku login
```

This will open a browser window to authenticate.

---

### 3. Create your Heroku app

If you don't have an app yet:

```bash
heroku create your-app-name
```

OR manually connect your repo to Heroku if you already created the app:

```bash
heroku git:remote -a your-app-name
```

Check your remotes:

```bash
git remote -v
```

You should see:

```bash
heroku  https://git.heroku.com/your-app-name.git (fetch)
heroku  https://git.heroku.com/your-app-name.git (push)
origin  https://github.com/yourusername/haddix-la.git (fetch)
origin  https://github.com/yourusername/haddix-la.git (push)
```

---

### 4. Deploy backend to Heroku

From the `/backend` folder:

```bash
git add .
git commit -m "Deploy backend to Heroku"
git push heroku main
```

(if your branch is called `master`, use `git push heroku master`)

---

## ✅ Common Commands

| Command                                      | Description                                  |
| -------------------------------------------- | -------------------------------------------- |
| `yarn dev`                                   | Start local dev server (backend or frontend) |
| `yarn build`                                 | Build production frontend assets             |
| `yarn start` (backend)                       | Start backend server (production mode)       |
| `heroku logs --tail --app <heroku-app-name>` | Watch Heroku app logs live                   |
| `heroku open`                                | Open deployed app in browser                 |

---

## 🛠 Services Overview

This project uses the following core services:

| Service                    | Purpose                                                             |
| -------------------------- | ------------------------------------------------------------------- |
| **MongoDB**                | Stores user data, project metadata, role information, etc.          |
| **AWS S3**                 | Stores uploaded file attachments (thumbnails, body images, videos). |
| **Node.js + Express**      | Backend server handling API endpoints and authentication.           |
| **Vue 3 + Vite + Vuetify** | Frontend application framework and UI system.                       |
| **Heroku**                 | Hosts and deploys the backend server for production use.            |
| **Day.js**                 | Lightweight library for manipulating dates and times in frontend.   |
| **Tiptap**                 | Rich text editor for editing role/project descriptions.             |
| **Pinia**                  | State management for frontend application data.                     |
| **Lodash**                 | Utility library used for object merging, deep diffs, and helpers.   |

---


## ⚠️ Gotchas

- **Attachments are fully replaced, not merged.**  
  When patching `projects[n].attachments`, the backend replaces the entire `attachments` block rather than merging it. Always send the complete updated attachments array when editing.

- **Heroku environment variables must be set manually.**  
  After deploying to Heroku, you must set `MONGO_URI`, `JWT_SECRET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `S3_BUCKET` using either the Heroku dashboard or CLI (`heroku config:set`).

- **Frontend expects VITE_API_URL to be correct.**  
  If your backend is deployed on Heroku, make sure your frontend `.env` file points to your Heroku app's API URL (e.g., `https://your-app-name.herokuapp.com/api`).

- **MongoDB Atlas requires IP Whitelisting.**  
  If you're using MongoDB Atlas, make sure your local machine or Heroku servers are whitelisted to access the database.

- **Vite uses port 5173 by default.**  
  If another app is using that port, Vite will fail to start. Either stop the conflicting app or change the Vite port manually.

- **Heroku free tier may cause server sleeping.**  
  If you're using the free Heroku tier, your app may take a few seconds to spin up after being idle.

---

# 🎉 You're ready to build, deploy, and extend Haddix.LA!
