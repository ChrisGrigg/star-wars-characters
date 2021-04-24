import { NotFoundError, resolver } from "blitz"
import { Prisma } from "db"

import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

// with more time this could be centralised
// as an 'apolloclient.ts file to avoid DRY
const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
})

interface GetCharactersInput
  extends Pick<Prisma.CharacterFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCharactersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let characters: any
    let data: any

    const query = gql`
      {
        allPeople {
          edges {
            node {
              id
              name
              filmConnection {
                edges {
                  node {
                    title
                  }
                }
              }
            }
          }
        }
      }
    `

    try {
      data = await client.query({ query })
    } catch (e) {
      console.error(e)
    }

    characters = data.data.allPeople.edges
    if (!data) throw new NotFoundError()

    return { characters }
  }
)
