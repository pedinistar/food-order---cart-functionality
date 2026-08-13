# React Food Order Cart

A small React project built to practice cart functionality and state management with `useReducer`.

## What this project does

- Displays a list of food products
- Adds products to the cart
- If a product is already in the cart, its quantity increases
- Increases/decreases quantity from the cart
- Removes an item when its quantity reaches 0
- Calculates the total price from the cart
- Clears the entire cart

## React concepts practiced

- `useReducer`
- `dispatch` and action types
- Reducer state updates
- Array methods: `find()`, `map()`, `filter()`, `reduce()`
- Conditional rendering
- Derived values from state
- Immutable state updates
- Rendering lists with `map()`

## Tech Stack

- React
- JavaScript
- Vite

## Why I built it

I wanted to understand how `useReducer` is used in a realistic feature rather than learning it only through a counter example.

The main goal was to practice thinking about state changes as actions:

- `ADD_TO_CART`
- `REMOVE_FROM_CART`
- `CLEAR_CART`

## Live Demo

Add your deployed Vercel link here.

## What I learned

The biggest takeaway was understanding that the reducer is responsible for changing the state, while values such as the cart total can be calculated from the current state instead of being stored separately.

This project is intentionally focused on functionality rather than UI design.
