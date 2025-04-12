import React, { useState } from "react";
import "../styles/MainPage.css";

function getCurrentMonthDates() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];

  // Fill previous month's trailing days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    dates.push(new Date(year, month, 0 - i));
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(year, month, i));
  }

  // Fill next month's leading days to complete the final week
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
  const [buyList, setBuyList] = useState({});
  const currentMonth = new Date().getMonth();

  const handleAddMeal = () => {
    if (!mealName || !ingredients) return;
    const ingredientArray = ingredients.split(",").map((item) => item.trim());
    setMealList((prev) => ({
      ...prev,
      [mealName]: ingredientArray,
    }));
    setMealName("");
    setIngredients("");
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
      const [schedule, groceryList] = data;
      setBuyList(groceryList);

      const updatedMeals = {};
      const dates = getCurrentMonthDates();

      dates.forEach((date) => {
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        const week = Math.floor((date.getDate() - 1) / 7) + 1;
        const scheduleKey = `${day}${week}`;
        const dateKey = date.toISOString().split("T")[0];

        if (schedule[scheduleKey]) {
          updatedMeals[dateKey] = schedule[scheduleKey];
        }
      });

      setCalendarMeals(updatedMeals);
    } catch (error) {
      console.error("Error submitting meals:", error);
    }
  };

  const dates = getCurrentMonthDates();

  return (
    <div className="main-container">
      <h1 style={{ color: "#000000" }}>Meal Calendar</h1>

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
          {dates.map((date) => {
            const dateKey = date.toISOString().split("T")[0];
            const isCurrentMonth = date.getMonth() === currentMonth;

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
          <h3 style={{ color: "#ffff" }}>Your Meals</h3>
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

      <div className="weekly-buy-lists">
        <h3 style={{ color: "#000000", marginTop: "2rem" }}>
          🛒 Weekly Grocery Lists
        </h3>
        {Object.entries(buyList).map(([weekName, items]) => (
          <div
            key={weekName}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <h4>{weekName}</h4>
            <ul>
              {Object.entries(items)
                .sort()
                .map(([item, count], i) => (
                  <li key={i}>
                    • {item} × {count}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
