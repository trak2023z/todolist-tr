import React from "react";

const Button = ({ name, color, width, height, onClick, styles }) => (
  <button
    className={`z-0 flex items-center justify-center border-[1.5px] border-solid text-[15px] no-underline 
    uppercase tracking-[0.1em] relative pointer transition-all after:content-[""] after:absolute
    after:top-0 after:left-0 after:h-[100%] after:w-0 after:transition-all  hover:tracking-[0.2em] after:hover:w-[100%]
    ${styles}
    ${width ? `w-[${width}]` : "w-[500px]"} ${
      height ? `h-[${height}]` : "h-[40px]"
    }  ${
      color === "red"
        ? "border-red text-red bg-lightRed"
        : "border-blue text-blue bg-lightBlue"
    } ${color === "red" ? "after:bg-red" : "after:bg-blue"} hover:text-[white]`}
    onClick={onClick}
  >
    <span className="relative z-10">{name}</span>
  </button>
);

export default Button;
