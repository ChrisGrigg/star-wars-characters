import { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCharacters from "app/characters/queries/getCharacters"

export const CharactersList = () => {
  const [{ characters }] = useQuery(getCharacters, {})

  return (
    <div>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link href={Routes.ShowCharacterPage({ characterId: character.id })}>
              <a>{character.name}</a>
            </Link>
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
