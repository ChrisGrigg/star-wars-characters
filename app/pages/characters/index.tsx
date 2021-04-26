/* eslint-disable jsx-a11y/no-onchange */
import { Suspense, useState } from "react"
import { Head, Link, useQuery, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCharacters from "app/characters/queries/getCharacters"
import { Character } from "app/characters/queries/character"

export const CharactersList = () => {
  const [query] = useQuery(getCharacters, {})
  const [characters, setCharacters] = useState(query.characters)
  const [orderHeight, setOrderHeight] = useState(false)
  const [orderGender, setOrderGender] = useState(false)
  const [charactersPristine] = useState(query.characters)
  const [speciesFilters] = useState(query.species)

  const sortByHeight = () => {
    setOrderHeight(!orderHeight)
    let sorted: Character[]
    sorted = [...characters].sort((a, b) => {
      return orderHeight ? b.height - a.height : a.height - b.height
    })
    setCharacters(sorted)
  }

  const sortByGender = () => {
    setOrderGender(!orderGender)
    const sorted = [...characters].sort((a, b) => {
      if (a.gender > b.gender) {
        return orderGender ? -1 : 1
      }
      if (b.gender > a.gender) {
        return orderGender ? 1 : -1
      }
      return 0
    })
    setCharacters(sorted)
  }

  const filterBySpecies = (event) => {
    setCharacters(charactersPristine)
    const filtered = charactersPristine.filter((item) => {
      return item.species && item.species.name === event.target.value
    })
    setCharacters(filtered)
  }

  const removeFilterBySpecies = () => {
    setCharacters(charactersPristine)
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h1 className="font-bold">Filters</h1>
          <h3 className="font-bold">Species:</h3>
          <select name="cars" id="cars" onChange={filterBySpecies}>
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
            <button onClick={sortByGender} className="flex-1 font-bold  text-blue-900">
              Gender
            </button>
            <button onClick={sortByHeight} className="flex-1 font-bold  text-blue-900">
              Height
            </button>
            <h3 className="flex-1 font-bold">Species</h3>
            <h3 className="flex-1 font-bold">Home World</h3>
          </div>
          <ul>
            {characters.map((character) => (
              <li key={character.id} className="flex">
                <Link href={Routes.ShowCharacterPage({ characterId: character.id })}>
                  <a className="flex-1">{character.name}</a>
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
      <Head>
        <title>Characters</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <CharactersList />
        </Suspense>
      </div>
    </>
  )
}

CharactersPage.authenticate = true
CharactersPage.getLayout = (page) => <Layout>{page}</Layout>

export default CharactersPage
