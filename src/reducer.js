export const initialState = {
  basket: [],
};

const reducer = (state, action) => {
  
  console.log(action);
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
        let cart_Items = state.basket.slice(); //state.basket.slice(); //Copies the current cartItems in the Application state

        const found = cart_Items.some((el) => el._id === action.item._id);
        console.log(found);
  
        if (!found) {
          cart_Items.push({ ...action.item, count: 1 });
  
          return {
            ...state,
            basket: cart_Items,
            //[...state.basket, action.item],
          };
        } else {
          //Find index of specific object using findIndex method.
          var objIndex = cart_Items.findIndex(
            (obj) => obj._id === action.item._id
          );
  
          // make new object of updated object.
          const updatedObj = {
            ...cart_Items[objIndex],
            count: cart_Items[objIndex].count + 1,
          };
  
          // make final new array of objects by combining updated object.
          const updatedProducts = [
            ...cart_Items.slice(0, objIndex),
            updatedObj,
            ...cart_Items.slice(objIndex + 1),
          ];
  
          console.log("original data=", cart_Items);
          console.log("updated data=", updatedProducts);
  
          return {
            ...state,
            basket: updatedProducts,
            //[...state.basket, action.item],
          };
        }
    //   break;

    // case "REMOVE_FROM_CART":
    //   return state.basket
    //     .map((item) =>
    //       item._id === action.item._id
    //         ? { ...item, count: item.count - 1 }
    //         : item
    //     )
    //     .filter((item) => item.count > 0);

    default:
      return state;
  }
};

export default reducer;
