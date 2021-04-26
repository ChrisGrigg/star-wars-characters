import React from "react"

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
      <button className="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
        <span className="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
          <i className="text-sm">search</i>
        </span>
      </button>
    </div>
  )
}

export default SearchBar
