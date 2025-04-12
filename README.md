Meal Prep App - Setup Guide (React + FastAPI)

This project has a React frontend and a FastAPI backend,
located in 'frontend/' and 'backend/' respectively.

Make sure you first have downloaded git and nodejs

=======================

1. # Clone the Repo
   git clone https://github.com/your-username/meal-prep-app.git
   cd meal-prep-app

# ======================= 2. Frontend Setup (React)

# Option A: CRA (Create React App)

cd frontend
npm install
npm start

# Option B: Vite (if using Vite)

cd frontend
npm install
npm run dev

# ======================= 3. Backend Setup (FastAPI)

cd ../backend
python -m venv venv

MAC: source venv/bin/activate

On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Run the server

uvicorn main:app --reload

# ======================= 4. Connecting React to FastAPI

In frontend/package.json, add this line:

"proxy": "http://localhost:8000"

This lets React talk to FastAPI without CORS issues.

# ======================= 5. Test Everything

React App: http://localhost:5173/ (or 3000 for CRA)
FastAPI App: http://localhost:8000
FastAPI Docs: http://localhost:8000/docs
