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

  return (
    <div>
      <div className="flex mb-3">
        <h3 className="flex-1 font-bold">Name</h3>
        <button onClick={sortByGender} className="flex-1 font-bold">
          Gender
        </button>
        <button onClick={sortByHeight} className="flex-1 font-bold">
          Height
        </button>
      </div>
      <ul>
        {characters.map((character) => (
          <li key={character.id} className="flex">
            <Link href={Routes.ShowCharacterPage({ characterId: character.id })}>
              <a className="flex-1">{character.name}</a>
            </Link>
            <span className="flex-1">{character.gender}</span>
            <span className="flex-1">{character.height}</span>
          </li>
        ))}
      </ul>
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
