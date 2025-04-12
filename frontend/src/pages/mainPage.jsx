import React, { useState } from "react";
import "../styles/MainPage.css";

function getCurrentMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }
  return dates;
}

function MainPage() {
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [mealList, setMealList] = useState([]);
  const [calendarMeals, setCalendarMeals] = useState({});

  const handleAddMeal = () => {
    if (!mealName || !ingredients) return;
    setMealList((prev) => [...prev, { mealName, ingredients }]);
    setMealName("");
    setIngredients("");
  };

  const currentMonthDates = getCurrentMonthDates();

  return (
    <div className="main-container">
      <h1>Meal Calendar</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Meal Name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleAddMeal}>Add Meal</button>
      </div>

      <div className="content-section">
        <div className="calendar">
          {currentMonthDates.map((date) => {
            const dateKey = date.toISOString().split("T")[0];
            return (
              <div key={dateKey} className="calendar-cell">
                <div className="calendar-date">{date.getDate()}</div>
                <ul className="calendar-meals">
                  {(calendarMeals[dateKey] || []).map((meal, i) => (
                    <li key={i}>
                      <strong>{meal.mealName}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="meal-list">
          <h3>Your Meals</h3>
          <ul>
            {mealList.map((meal, index) => (
              <li key={index}>
                <strong>{meal.mealName}</strong> – {meal.ingredients}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
