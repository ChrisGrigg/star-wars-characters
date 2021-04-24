import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCharacters from "app/characters/queries/getCharacters"

const ITEMS_PER_PAGE = 100

export const CharactersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ characters }] = usePaginatedQuery(getCharacters, {
    where: {},
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <ul>
        {characters.map((character) => (
          <li key={character.node.id}>
            <Link href={Routes.ShowCharacterPage({ characterId: character.node.id })}>
              <a>{character.node.name}</a>
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
