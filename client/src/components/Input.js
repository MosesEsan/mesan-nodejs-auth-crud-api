import React from "react";

const Input = ({label, name, type, ref}) => (
    <div>
        <label>{label}</label>
        <input
            type={type || "text"}
            name={name}
            ref={ref}
        />
    </div>
);

export default Input;