import React from "react";
import classes from "./Input.module.css";

// htmlFor => To link <label> with <input> using the "props.input.id"
// {...props.input} => will contains "props.input.id" so they can be linked
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
