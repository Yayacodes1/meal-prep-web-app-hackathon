from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from schedule import mealScheduler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Just for now :)
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

@app.post("/meals")
async def save_meals(request: Request):
    meal_list = await request.json()
    schedule = get_scheduled_meals(meal_list)
    return schedule