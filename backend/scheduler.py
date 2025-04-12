"""This function will take a dictionary with the a meal as a key(a string) 
and values of a list of strings with the ingredients of that meal. it will return a 
dictionary with the a string as keys and the value being
another dictionary with the meal as key and the ingredients as values.
as the key and """

import random
def mealScheduler(meal_dict):
    meal_schedule = {}
    LunchorDinner = {'Lunch', 'Dinner'}
    days = [f"{day}{week}" for week in range(1, 6) 
                           for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
    meals = list(meal_dict.items())
    for idx, day in enumerate(days):
        day_schedule = {}
        # Choose lunch meal randomly
        lunch, lunch_ingredients = random.choice(meals)
        # For dinner, if possible, choose a different meal
        if len(meals) > 1:
            remaining_meals = [m for m in meals if m[0] != lunch]
            dinner, dinner_ingredients = random.choice(remaining_meals)
        else:
            dinner, dinner_ingredients = lunch, lunch_ingredients
        day_schedule['Lunch'] = lunch
        day_schedule['Dinner'] = dinner
        meal_schedule[day] = day_schedule
    return meal_schedule



