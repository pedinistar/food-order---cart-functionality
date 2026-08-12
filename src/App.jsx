import { useReducer } from "react";

function App() {
  const products = [
    { id: 1, name: "Pizza", price: 299 },
    { id: 2, name: "Burger", price: 199 },
    { id: 3, name: "Fries", price: 99 },
  ];

  const initialState = {
    cart: [],
  };

  const reducer = (state, action) => {
    if (action.type == "ADD_TO_CART") {
      // check if the product is already in the cart
      const existsProduct = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      // if yes then increase quantiy
      if (existsProduct) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (existsProduct.id === item.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          }),
        };
      } else {
        // if not then remain quantity = 1
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              quantity: 1,
            },
          ],
        };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {/* Products */}
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: product,
              })
            }
          >
            Add
          </button>
        </div>
      ))}

      {/* Cart */}
      <hr />
      <h3>Cart</h3>
      {state.cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button>+</button>
          <button>-</button>
        </div>
      ))}
    </div>
  );
}

export default App;
