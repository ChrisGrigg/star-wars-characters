/* eslint-disable jsx-a11y/no-onchange */
import { Suspense, useState } from "react"
import { Head, Link, useQuery, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCharacters from "app/characters/queries/getCharacters"
import SearchBar from "app/core/components/SearchBar"

export const CharactersList = () => {
  const [query] = useQuery(getCharacters, {})
  const [characters, setCharacters] = useState(query.characters)
  const [orderSort, setOrderSort] = useState(false)
  const [charactersDefault] = useState(query.characters)
  const [speciesFilters] = useState(query.species)

  const sort = (property: string) => {
    setOrderSort(!orderSort)
    const sorted = characters.sort((a, b) => {
      if (a[property] > b[property]) {
        return orderSort ? -1 : 1
      }
      if (b[property] > a[property]) {
        return orderSort ? 1 : -1
      }
      return 0
    })
    setCharacters(sorted)
  }

  const filterBySpecies = (event) => {
    setCharacters(charactersDefault)
    const filtered = charactersDefault.filter((item) => {
      return item.species && item.species.name === event.target.value
    })
    setCharacters(filtered)
  }

  const removeFilterBySpecies = () => {
    setCharacters(charactersDefault)
  }

  const updateInputSearch = async (inputSearch: string) => {
    // this is n^2 but with this small data set on the front-end
    // it does not matter, if increasing in size use hash map
    const filtered = charactersDefault.filter((country) => {
      return country.name.toLowerCase().includes(inputSearch.toLowerCase())
    })
    setCharacters(filtered)
  }

  return (
    <div>
      <SearchBar setKeyword={updateInputSearch} />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h1 className="font-bold">Filters</h1>
          <h3 className="font-bold">Species:</h3>
          {/* TODO: this should be a list with checkboxes rather than a dropdown so multiple items can be selected */}
          {/* TODO: this should be a 'Filter' component so it can be repeated for other properties such as 'Gender' */}
          <select name="species" id="species" onChange={filterBySpecies}>
            {speciesFilters.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <button onClick={removeFilterBySpecies} className="text-left text-sm text-blue-900">
            Remove Species Filter
          </button>
        </div>
        <div className="col-span-10">
          <div className="flex mb-3">
            <h3 className="flex-1 font-bold">Name</h3>
            <button
              onClick={() => sort("gender")}
              className="flex-1 font-bold text-blue-900 text-left"
            >
              Gender
            </button>
            <button
              onClick={() => sort("height")}
              className="flex-1 font-bold text-blue-900 text-left"
            >
              Height
            </button>
            <h3 className="flex-1 font-bold">Species</h3>
            <h3 className="flex-1 font-bold">Home World</h3>
          </div>
          <ul>
            {characters.map((character) => (
              <li key={character.id} className="flex">
                <Link href={Routes.ShowCharacterPage({ characterId: character.id })}>
                  <a className="flex-1 text-blue-900">{character.name}</a>
                </Link>
                <span className="flex-1">{character.gender}</span>
                <span className="flex-1">{character.height}</span>
                <span className="flex-1">{character.species && character.species.name}</span>
                <span className="flex-1">{character.homeworld && character.homeworld.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const CharactersPage: BlitzPage = () => {
  return (
    <>
      <div className="p-5">
        <Head>
          <title>Characters</title>
        </Head>

        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <CharactersList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

CharactersPage.authenticate = true
CharactersPage.getLayout = (page) => <Layout>{page}</Layout>

export default CharactersPage
