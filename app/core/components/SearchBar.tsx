import React, { useState } from "react"
import Button from "app/core/components/Button"

const SearchBar = ({ keyword, setKeyword }) => {
  const [searchInput, setSearchInput] = useState("")

  return (
    <div className="flex border-grey-light border mb-5">
      <input
        className="w-full rounded ml-1"
        type="text"
        key="search bar"
        value={keyword}
        placeholder={"Search for a character by their name ..."}
        onChange={(e) => {
          setSearchInput(e.target.value)
          setKeyword(e.target.value)
        }}
      />
      <Button
        label="search"
        onClick={() => {
          setKeyword(searchInput)
        }}
      />
    </div>
  )
}

export default SearchBar
