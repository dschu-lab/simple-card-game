<p align="center">
  <h1 align="center">Simple Card Game</h1>
  <p align="center">A simple card game skeleton written in TypeScript using React.js</p>
  <p align="center">
    <a href="https://github.com/dschu-lab/simple-card-game/actions/workflows/pr-check.yml">
      <img src="https://github.com/dschu-lab/simple-card-game/actions/workflows/pr-check.yml/badge.svg" />
    </a>
    <a href="https://codecov.io/gh/dschu-lab/simple-card-game">
      <img src="https://codecov.io/gh/dschu-lab/simple-card-game/branch/main/graph/badge.svg?token=RV3LHBDCBH"/>
    </a>
    <a href="https://dschu-simple-card-game.surge.sh">
      <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fdschu-simple-card-game.surge.sh">
    </a>
    <a href="https://github.com/prettier/prettier">
      <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" />
    </a>
  </p>
</p>

## In action

![simple-card-game-preview](https://user-images.githubusercontent.com/3493187/153751833-b35e17c3-4a95-484c-9d42-26bc9c4c588d.gif)

[Open the live version](https://dschu-simple-card-game.surge.sh)

## How to start local development

This project was bootstrapped using the TypeScript template of the [Create React App](https://github.com/facebook/create-react-app).

## Quick Overview

```bash
npm i # Install dependencies
npm run start # Starts the development server on localhost:3000
```

## Available scripts

Use `npm run [COMMAND]` to execute available scripts.

| Command     | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `start`     | _Starts the development server_                                       |
| `build`     | _Build the app for production_                                        |
| `postbuild` | _Runs automatically after the build. Creates a 200.html for surge.sh_ |
| `test`      | _Launches the test runner_                                            |
| `coverage`  | _Analyzes test coverage_                                              |
| `lint`      | _Checks for linting errors_                                           |
| `eject`     | _Ejects from react-scripts_                                           |

## Backend

The backend was mocked using [Mocko](http://mocko.dev).

| METHOD   | Endpoint      | Description                                                                               |
| -------- | ------------- | ----------------------------------------------------------------------------------------- |
| **GET**  | `/cards/`     | _Returns a list of cards_                                                                 |
| **POST** | `/cards/{id}` | _Update a card by its id. (Will return data from the payload without modifying any data)_ |

## Deployment

The deployment is automated using Github Actions and pushes the production build automatically pushed to [surge.sh](https://surge.sh/).
