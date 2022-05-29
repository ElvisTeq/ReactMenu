import React from "react";
import classes from "./Input.module.css";

// htmlFor => To link <label> with <input> using the "props.input.id"
// {...props.input} => contains "props.input.id" so they are linked
const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
