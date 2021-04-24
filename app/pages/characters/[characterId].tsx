import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCharacter from "app/characters/queries/getCharacter"

export const Character = () => {
  const characterId = useParam("characterId", "string")
  const [character] = useQuery(getCharacter, { id: characterId })

  return (
    <>
      <Head>
        <title>{character.id}</title>
      </Head>

      <div>
        <h1>You chose: {character.name}</h1>
        <pre>{JSON.stringify(character, null, 2)}</pre>
      </div>
    </>
  )
}

const ShowCharacterPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CharactersPage()}>
          <a>Characters</a>
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
