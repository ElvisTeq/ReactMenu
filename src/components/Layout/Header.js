import React from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

// {classes["main-image"]} => CSS with a "-" has to be written in []
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
