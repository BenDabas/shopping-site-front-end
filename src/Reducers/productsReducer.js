const initialState = {
  products: [],
  shoppingCartProducts: [],
  shoppingCartSum: 0,
  topFiveSells: [],
  topFiveUniqueSells: [],
  fiveDaysTransactions: [],
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'admin/deleteProduct': {
      const productId = payload;
      const newProducts = state?.products.filter(
        (product) => product.id !== productId
      );
      return { ...state, products: newProducts };
    }
    case 'getAllProducts': {
      const allProducts = payload;
      return { ...state, products: allProducts };
    }
    case 'admin/createProductAction': {
      const productsCopy = payload;
      return { ...state, products: productsCopy };
    }
    case 'admin/editProductAction': {
      const product = payload;
      const updatedProducts = state?.products?.map((el) =>
        el.id === product.id ? product : el
      );
      return { ...state, products: updatedProducts };
    }
    case 'home/addProductToShoppingCartAction': {
      const { newSum, shoppingCartProducts } = payload;

      return {
        ...state,
        shoppingCartProducts: shoppingCartProducts,
        shoppingCartSum: newSum,
      };
    }
    case 'home/increaseProductAmountAction': {
      const product = payload;
      const newSum = state.shoppingCartSum + product.price;

      state.shoppingCartProducts.forEach((el) => {
        if (el.id === product.id) {
          el.amount++;
        }
        return el;
      });
      return {
        ...state,
        shoppingCartSum: newSum,
      };
    }
    case 'home/decreaseProductAmountAction': {
      const product = payload;
      const newSum = state.shoppingCartSum - product.price;

      state.shoppingCartProducts.forEach((el) => {
        if (el.id === product.id) {
          el.amount--;
        }
        return el;
      });
      const filteredShoppingList = state.shoppingCartProducts.filter(
        (el) => el.amount !== 0
      );
      return {
        ...state,
        shoppingCartSum: newSum,
        shoppingCartProducts: [...filteredShoppingList],
      };
    }
    case 'home/sendTransactionAction': {
      return {
        ...state,
        shoppingCartSum: 0,
        shoppingCartProducts: [],
      };
    }
    case 'stats/getTopFiveSells': {
      const topFiveSells = payload;
      return {
        ...state,
        topFiveSells: topFiveSells,
      };
    }
    case 'stats/getTopFiveUniqueSells': {
      const topFiveUniqueSells = payload;
      return {
        ...state,
        topFiveUniqueSells: topFiveUniqueSells,
      };
    }
    case 'stats/getFiveDaysTransactions': {
      const fiveDaysTransactions = payload;
      return {
        ...state,
        fiveDaysTransactions: fiveDaysTransactions,
      };
    }

    default:
      return { ...state };
  }
};

export default productsReducer;
