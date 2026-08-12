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
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      // if yes then increase quantiy
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (existingProduct.id === item.id) {
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

    // REMOVE FROM CART
    if (action.type == "REMOVE_FROM_CART") {
      // we need to check the quantity of the product if its 1 then we will remove it all together if its not one then we will only decrese the quantity
      if (action.payload.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      }
    }

    // Clear the cart
    if (action.type === "CLEAR_CART") {
      return {
        ...state,
        cart: [],
      };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const totalBill = state.cart.reduce((total, currentItem) => {
    return total + currentItem.price * currentItem.quantity;
  }, 0);

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
          <p>Total: {item.price * item.quantity}</p>
          <button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: item,
              })
            }
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item,
              })
            }
          >
            -
          </button>
        </div>
      ))}

      {totalBill === 0 ? null : <h4>Total: ${totalBill}</h4>}

      {state.cart.length !== 0 && (
        <button
          onClick={() =>
            dispatch({
              type: "CLEAR_CART",
            })
          }
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default App;
