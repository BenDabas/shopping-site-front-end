import HttpService from '../Services/HttpService/httpService';

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
      // const productsCopy = state.products;
      // productsCopy.push(newProduct);
      // const newProducts = [...state?.products, newProduct];
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

      // const product = payload;
      // const newSum = state.shoppingCartSum + product.price;
      // // const newShoppingCart = state.shoppingCartProducts.map((el) =>
      // //   el.id === product.id ? (el.amount = el.amount + 1) : (el.amount = 0)
      // // );

      // const isProductInShoppingCart = state.shoppingCartProducts.find(
      //   (el) => el.id === product.id
      // );
      // if (isProductInShoppingCart) {
      //   // const newShoppingCart = state.shoppingCartProducts.map((el) =>
      //   //   el.id === product.id ? (el.amount = el.amount + 1) : el
      //   // );
      //   state.shoppingCartProducts.forEach((el) => {
      //     if (el.id === product.id) {
      //       el.amount++;
      //     }
      //     return el;
      //   });
      //   return {
      //     ...state,
      //     // shoppingCartProducts: [...newShoppingCart],
      //     shoppingCartSum: newSum,
      //   };
      // } else {
      //   state.shoppingCartProducts.push({ ...product, amount: 1 });
      // }
      // const newShoppingCart = [...state.shoppingCartProducts, product];
      return {
        ...state,
        // shoppingCartProducts: [...state.shoppingCartProducts],
        shoppingCartProducts: shoppingCartProducts,
        shoppingCartSum: newSum,
      };
    }
    case 'home/increaseProductAmountAction': {
      const product = payload;
      const newSum = state.shoppingCartSum + product.price;
      // const newShoppingCart = state.shoppingCartProducts.map((el) =>
      //   el.id === product.id ? el.amount++ : el
      // );
      state.shoppingCartProducts.forEach((el) => {
        if (el.id === product.id) {
          el.amount++;
        }
        return el;
      });
      return {
        ...state,
        shoppingCartSum: newSum,
        // shoppingCartProducts: [...newShoppingCart],
      };
    }
    case 'home/decreaseProductAmountAction': {
      const product = payload;
      const newSum = state.shoppingCartSum - product.price;
      // const newShoppingCart = state.shoppingCartProducts.map((el) =>
      //   el.id === product.id ? el.amount++ : el
      // );

      // const filteredShoppingList = state.shoppingCartProducts.filter(
      //   (el) => el.id !== product.id && el.amount !== 1
      // );
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
