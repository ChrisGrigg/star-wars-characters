import React, { useCallback, useState } from "react"
import Button from "app/core/components/Button"
import debounce from "lodash.debounce"

const SearchBar = ({ setKeyword }) => {
  const [searchInput, setSearchInput] = useState("")

  const debouncedSave = useCallback(
    debounce((nextValue) => setKeyword(nextValue), 1000),
    [] // will be created only once initially
  )

  const handleChange = (event) => {
    const { value: nextValue } = event.target
    setSearchInput(nextValue)
    // Even though handleChange is created on each render and executed
    // it references the same debouncedSave that was created initially
    debouncedSave(nextValue)
  }

  return (
    <div className="flex border-grey-light border mb-5">
      <input
        className="w-full rounded ml-1"
        type="text"
        key="search bar"
        placeholder={"Search for a character by their name ..."}
        onChange={handleChange}
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
