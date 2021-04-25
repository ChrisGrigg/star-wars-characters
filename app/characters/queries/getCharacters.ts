import { NotFoundError, resolver } from "blitz"

import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { Character } from "./character"

// with more time this could be centralised
// as an 'apolloclient.ts file to avoid DRY
const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
})

export default resolver.pipe(resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  let characters: any
  let charactersFormatted: Character[]
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
                  id
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

  charactersFormatted = characters.map((character) => {
    return character.node
  })
  console.log("charactersFormatted", charactersFormatted)

  if (!data) throw new NotFoundError()

  return { characters: charactersFormatted }
})
