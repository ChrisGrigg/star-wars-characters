import { resolver, NotFoundError } from "blitz"
import * as z from "zod"

import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { Character } from "./character"

// with more time this could be centralised
// as an 'apolloclient.ts file to avoid DRY
const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
})

const GetCharacter = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCharacter), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  let character: Character
  let data: any

  const query = gql`
    {
      person(id: "${id}") {
        id
        name
        gender
        height
        species {
          id
          name
        }
        homeworld {
          id
          name
        }
        filmConnection {
          edges {
            node {
              id
              title
            }
          }
        }
        birthYear
        eyeColor
        skinColor
        hairColor
      }
    }
  `

  try {
    data = await client.query({ query })
  } catch (e) {
    console.error(e)
  }

  character = data.data.person
  if (!data) throw new NotFoundError()

  return character
})
