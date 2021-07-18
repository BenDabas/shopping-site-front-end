import HttpService from '../Services/HttpService/httpService';
import store from '../Store/store';

export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    // type: 'admin/deleteProduct',

    // const productToDelete = rows[index];

    // const res = await axios.delete('products/delete', productToDelete.id);
    const res = await HttpService.makeHttpDeleteRequest(
      `products/delete/${productId}`
    );
    if (res) {
      console.log(
        `Actions/productsAction: deleteProductAction: Deleted product success! product's id: ${productId}`
      );
      dispatch({
        type: 'admin/deleteProduct',
        payload: productId,
      });
      //   const newRows = rows.filter((row) => row.id !== productId);
      //   setRows(newRows);
    } else {
      console.log(
        `Actions/productsAction: deleteProductAction: Deleted product failed! product's id: ${productId}`
      );
    }
  } catch (error) {
    console.log(
      `Actions/productsAction: deleteProductAction: Deleted product failed! Error: ${error.message}`
    );
  }
};

export const getAllProductsAction = () => async (dispatch) => {
  try {
    const allProducts = await HttpService.makeHttpGetRequest(
      '/products/get-all'
    );
    if (allProducts) {
      dispatch({ type: 'getAllProducts', payload: allProducts });
    }
  } catch (error) {
    console.log(
      `Actions/productsAction: getAllProductsAction Error get all products: ${error.message}`
    );
  }
};

export const createNewProductAction = (newProduct) => async (dispatch) => {
  try {
    const res = await HttpService.makeHttpPostRequest(
      'products/create',
      newProduct
    );
    if (res) {
      console.log(
        `Actions/productsAction: createNewProductAction: Added product success! product's title: ${newProduct.title}`
      );

      const { products } = store.getState().products;
      const productsCopy = products;
      productsCopy.push(newProduct);
      dispatch({
        type: 'admin/createProductAction',
        payload: productsCopy,
      });
    } else {
      console.log(
        `Actions/productsAction: createNewProductAction: Added product failed! product's title: ${newProduct.title}`
      );
    }
  } catch (error) {
    console.log(
      `Actions/productsAction: createNewProductAction: Added product failed! Error: ${error.message}`
    );
  }
};

export const editProductAction = (product) => async (dispatch) => {
  try {
    const res = await HttpService.makeHttpPatchRequest(
      'products/update',
      product
    );
    if (res) {
      console.log(
        `Actions/productsAction: editProductAction: Edited product success! product's title: ${product.title}`
      );
      dispatch({
        type: 'admin/editProductAction',
        payload: product,
      });
    } else {
      console.log(
        `Actions/productsAction: editProductAction: Edited product failed! product's title: ${product.title}`
      );
    }
  } catch (error) {
    console.log(
      `Actions/productsAction: editProductAction: Edited product failed! Error: ${error.message}`
    );
  }
};

export const addProductToShoppingCartAction = (product) => async (dispatch) => {
  try {
    // const { products } = store.getState().products;
    const { shoppingCartSum, shoppingCartProducts } = store.getState().products;
    // const { shoppingCartSum, shoppingCartProducts } = store.getState().products;
    const newSum = shoppingCartSum + product.price;

    const isProductInShoppingCart = shoppingCartProducts.find(
      (el) => el.id === product.id
    );
    if (isProductInShoppingCart) {
      shoppingCartProducts.forEach((el) => {
        if (el.id === product.id) {
          el.amount++;
        }
        return el;
      });
    } else {
      shoppingCartProducts.push({ ...product, amount: 1 });
    }
    dispatch({
      type: 'home/addProductToShoppingCartAction',
      payload: { newSum, shoppingCartProducts },
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export const increaseProductAmountAction = (product) => async (dispatch) => {
  dispatch({
    type: 'home/increaseProductAmountAction',
    payload: product,
  });
};

export const decreaseProductAmountAction = (product) => async (dispatch) => {
  dispatch({
    type: 'home/decreaseProductAmountAction',
    payload: product,
  });
};

export const sendTransactionAction = (dispatch) => {
  dispatch({
    type: 'home/sendTransactionAction',
  });
};
