import React from "react"
import Button from "app/core/components/Button"

const SearchBar = ({ keyword, setKeyword }) => {
  return (
    <div className="flex border-grey-light border mb-5">
      <input
        className="w-full rounded ml-1"
        type="text"
        key="search bar"
        value={keyword}
        placeholder={"Search for a character by their name ..."}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {/* This Button is just a UX placeholder to give an indication to the user what the search bar is for */}
      <Button label="search" onClick="" />
    </div>
  )
}

export default SearchBar
