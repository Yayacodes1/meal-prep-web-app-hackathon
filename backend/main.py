from fastapi import FastAPI, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from scheduler import mealScheduler
from fastapi.middleware.cors import CORSMiddleware


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
    schedule = mealScheduler(meal_list)
    # ingredient_list = grocery(schedule, meal_list)
    return schedule
