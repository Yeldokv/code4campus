import React from 'react';

const FoodTab = ({ foods, handleOrder }) => {
  return (
    <div className="food-tab">
      {foods.map(food => (
        <div key={food.id} className="food-item">
          <div className="food-details">
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <span className="price">${food.price.toFixed(2)}</span>
          </div>
          <button onClick={() => handleOrder(food)}>
            Order
          </button>
        </div>
      ))}
    </div>
  );
};

export default FoodTab;