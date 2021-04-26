# **star-wars-characters**

This application displays Star Wars characters information which can be searched, sorted and filtered.

## Environments

This application was developed on:

- MacOS Big Sur v11.2.3
- Node v12.16.1
- Yarn v1.22.10

## Getting Started

Run your app in the development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Clone the following repository https://github.com/graphql/swapi-graphql. Follow the instructions on it's README.md to start a separate DB server.

Then enter the port number it displays in your ".env.local" file:

```
APOLLO_CLIENT_URL="http://localhost:*****"
```

## Tests

Runs your tests using Jest.

```
yarn test
```

## TODO (with more time)

- at the moment filtering and searching resets the state of the data. Apply state management such as Redux
- create Layout so styling such as padding can be applied once to a parent component for DRY principle
- 'characters.tsx' page should be divided into more components so it's less bulky and more readable
- create resolver to toggle favourite character
