import React from 'react'
import './Button.css'

const isOperator = val => {
    // Return True if it is a number
    // and not an operator
    return !isNaN(val) || val === "." || val === "=";
}

export const Buttons = props => (
    <div className={`button-wrapper ${
        isOperator(props.children) ? null: "operator"
    }`} onClick={() => props.handleClick(props.children)}>
        {props.children}
    </div>
)

