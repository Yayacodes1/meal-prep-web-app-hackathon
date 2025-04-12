import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
  const [mealList, setMealList] = useState({});
  const [calendarMeals, setCalendarMeals] = useState({});
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleAddMeal = () => {
    if (!mealName || !ingredients) return;
    const ingredientArray = ingredients.split(",").map((item) => item.trim());
    setMealList((prev) => ({
      ...prev,
      [mealName]: ingredientArray,
    }));
    setMealName("");
    setIngredients("");
    console.log(mealList);
  };

  const handleSubmitMeals = async () => {
    try {
      const response = await fetch("http://localhost:8000/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealList),
      });
      const data = await response.json();
      console.log("Submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting meals:", error);
    }
  };

  const currentMonthDates = getCurrentMonthDates();

  return (
    <div className="main-container">
      <div className="header">
        <h1>Meal Calendar</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

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
            {Object.entries(mealList).map(([name, ingredients], index) => (
              <li key={index}>
                <strong>{name}</strong> – {ingredients.join(", ")}
              </li>
            ))}
          </ul>
          <button onClick={handleSubmitMeals}>Calculate my meal plan!</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
