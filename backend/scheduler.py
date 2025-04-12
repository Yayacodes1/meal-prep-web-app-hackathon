"""This function will take a dictionary with the a meal as a key(a string) 
and values of a list of strings with the ingredients of that meal. it will return a 
dictionary with the a string as keys and the value being
another dictionary with the meal as key and the ingredients as values.
as the key and """

import random
def mealScheduler(meal_dict):
    meal_schedule = {}
    days = [f"{day}{week}" for week in range(1, 6) 
                           for day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
    meals = list(meal_dict.items())
    for idx, day in enumerate(days):
        if idx > 0 and len(meals) > 1:
            prev_meal = meal_schedule[days[idx-1]]
            # Filter out the previous meal if possible
            filtered_meals = [m for m in meals if m[0] != prev_meal]
            meal, ingredients = random.choice(filtered_meals)
        else:
            meal, ingredients = random.choice(meals)
        meal_schedule[day] = meal
    return meal_schedule



