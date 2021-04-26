import React from "react"

const Button = ({ label, onClick }) => {
  return (
    <button
      className="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest"
      onClick={onClick}
    >
      <span className="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
        <i className="text-sm">{label}</i>
      </span>
    </button>
  )
}

export default Button
