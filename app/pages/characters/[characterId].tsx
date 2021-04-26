/* eslint-disable jsx-a11y/no-onchange */
import { Suspense, useState } from "react"
import { Head, Link, useQuery, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCharacter from "app/characters/queries/getCharacter"
import getCharacters from "app/characters/queries/getCharacters"
import CharacterCard from "app/core/components/CharacterCard"

export const Character = () => {
  const characterId = useParam("characterId", "string")
  const [character] = useQuery(getCharacter, { id: characterId })

  const [query] = useQuery(getCharacters, {})
  const [characters, setCharacters] = useState(query.characters)
  const [charactersDefault] = useState(query.characters)

  const filterByFilm = (event) => {
    setCharacters(charactersDefault)
    // Time complexity of "n^2" isn't great but it's ok for small data sets and
    // easy to understand. If the data set becomes bigger create a hash map so this
    // nested loop can be divided into 2 separate loops "n + n".
    const filtered = charactersDefault.filter((character) => {
      return character.filmConnection.edges.some((film) => {
        return film.node.title === event.target.value
      })
    })
    setCharacters(filtered)
  }

  return (
    <>
      <Head>
        <title>{character.id}</title>
      </Head>

      <div>
        <CharacterCard character={character} />
      </div>

      <div className="mt-5">
        <h3 className="font-bold mb-3">View characters who've been in the same films:</h3>
        <select className="mb-3" name="species" id="species" onChange={filterByFilm}>
          {character.filmConnection.edges.map((item) => (
            <option key={item.node.id} value={item.node.title}>
              {item.node.title}
            </option>
          ))}
        </select>

        <ul>
          {characters.map((character) => (
            <li key={character.id} className="ml-3">
              <span>{character.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const ShowCharacterPage: BlitzPage = () => {
  return (
    <div className="p-5">
      <p className="mb-5">
        <Link href={Routes.CharactersPage()}>
          <a className="font-bold text-blue-900">Back to Characters</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Character />
      </Suspense>
    </div>
  )
}

ShowCharacterPage.authenticate = true
ShowCharacterPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCharacterPage
