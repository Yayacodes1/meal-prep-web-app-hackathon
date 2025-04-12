from fastapi import FastAPI, HTTPException, Depends
from firebase_admin import auth
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from firebase import db

app = FastAPI()

# Pydantic models for request validation
class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class MealCreate(BaseModel):
    title: str
    description: str
    ingredients: List[str]
    instructions: List[str]
    prep_time: int  # in minutes
    cooking_time: int  # in minutes
    servings: int
    image_url: Optional[str] = None

# Authentication middleware
async def get_current_user(authorization: str = Depends(lambda x: x)):
    try:
        token = authorization.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# User endpoints
@app.post("/api/users/signup")
async def signup(user: UserCreate):
    try:
        # Create user in Firebase Auth
        user_record = auth.create_user(
            email=user.email,
            password=user.password,
            display_name=user.name
        )
        
        # Store additional user data in Firestore
        db.collection('users').document(user_record.uid).set({
            'name': user.name,
            'email': user.email,
            'created_at': datetime.now()
        })
        
        return {"message": "User created successfully", "uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Meal endpoints
@app.post("/api/meals")
async def create_meal(meal: MealCreate, current_user = Depends(get_current_user)):
    try:
        # Add meal to Firestore
        meal_ref = db.collection('meals').document()
        meal_data = meal.dict()
        meal_data.update({
            'user_id': current_user['uid'],
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        })
        meal_ref.set(meal_data)
        
        return {"message": "Meal created successfully", "meal_id": meal_ref.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/meals")
async def get_meals(current_user = Depends(get_current_user)):
    try:
        # Get all meals for the current user
        meals = db.collection('meals').where('user_id', '==', current_user['uid']).stream()
        return {"meals": [{"id": meal.id, **meal.to_dict()} for meal in meals]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/meals/{meal_id}")
async def get_meal(meal_id: str, current_user = Depends(get_current_user)):
    try:
        meal = db.collection('meals').document(meal_id).get()
        if not meal.exists:
            raise HTTPException(status_code=404, detail="Meal not found")
        
        meal_data = meal.to_dict()
        if meal_data['user_id'] != current_user['uid']:
            raise HTTPException(status_code=403, detail="Not authorized to access this meal")
            
        return {"id": meal.id, **meal_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/api/meals/{meal_id}")
async def update_meal(meal_id: str, meal: MealCreate, current_user = Depends(get_current_user)):
    try:
        meal_ref = db.collection('meals').document(meal_id)
        meal_doc = meal_ref.get()
        
        if not meal_doc.exists:
            raise HTTPException(status_code=404, detail="Meal not found")
            
        meal_data = meal_doc.to_dict()
        if meal_data['user_id'] != current_user['uid']:
            raise HTTPException(status_code=403, detail="Not authorized to update this meal")
        
        update_data = meal.dict()
        update_data['updated_at'] = datetime.now()
        meal_ref.update(update_data)
        
        return {"message": "Meal updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/meals/{meal_id}")
async def delete_meal(meal_id: str, current_user = Depends(get_current_user)):
    try:
        meal_ref = db.collection('meals').document(meal_id)
        meal = meal_ref.get()
        
        if not meal.exists:
            raise HTTPException(status_code=404, detail="Meal not found")
            
        meal_data = meal.to_dict()
        if meal_data['user_id'] != current_user['uid']:
            raise HTTPException(status_code=403, detail="Not authorized to delete this meal")
            
        meal_ref.delete()
        return {"message": "Meal deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


