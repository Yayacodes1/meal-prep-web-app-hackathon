import React, { useState } from "react";
import "../styles/MainPage.css";

function getCurrentMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];

  // Fill previous month's trailing days if needed
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, 0 - i);
    dates.push(prevDate);
  }

  // Fill current month days
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }

  // Fill next month's leading days if needed to complete full weeks
  while (dates.length % 7 !== 0) {
    const nextDate = new Date(
      year,
      month,
      daysInMonth + (dates.length - daysInMonth - startDayOfWeek + 1)
    );
    dates.push(nextDate);
  }

  return dates;
}

function MainPage() {
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [mealList, setMealList] = useState({});
  const [calendarMeals, setCalendarMeals] = useState({});
  const today = new Date();
  const currentMonth = today.getMonth();

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
      console.log("Meal Schedule from backend:", data);

      // Parse backend response and fill into calendarMeals
      const schedule = data || {};
      const updatedMeals = {};
      const currentMonthDates = getCurrentMonthDates();

      currentMonthDates.forEach((date) => {
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const weekIndex = Math.floor((date.getDate() - 1) / 7) + 1;
        const scheduleKey = `${dayName}${weekIndex}`;
        if (schedule[scheduleKey]) {
          updatedMeals[date.toISOString().split("T")[0]] =
            schedule[scheduleKey];
        }
      });

      setCalendarMeals(updatedMeals);
    } catch (error) {
      console.error("Error submitting meals:", error);
    }
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
            const isCurrentMonth = date.getMonth() === currentMonth;
            const dateKey = date.toISOString().split("T")[0];
            return (
              <div
                key={dateKey}
                className={`calendar-cell ${
                  !isCurrentMonth ? "grayed-out" : ""
                }`}
              >
                <div className="calendar-date">{date.getDate()}</div>
                <ul className="calendar-meals">
                  {calendarMeals[dateKey] && (
                    <>
                      <li>
                        <strong>Lunch:</strong> {calendarMeals[dateKey].Lunch}
                      </li>
                      <li>
                        <strong>Dinner:</strong> {calendarMeals[dateKey].Dinner}
                      </li>
                    </>
                  )}
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
