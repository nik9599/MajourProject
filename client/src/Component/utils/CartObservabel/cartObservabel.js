import { BehaviorSubject } from "rxjs";

class CartObservabel {
  constructor() {
    const storedData =
      JSON.parse(window.localStorage.getItem("cartData")) || [];
    this.cartItemSubject = new BehaviorSubject(storedData);
  }

  addItem(item) {
    const currentItems = this.cartItemSubject.getValue();

    const updatedItems = [...currentItems, item];
    this.cartItemSubject.next(updatedItems);

    window.localStorage.setItem("cartData", JSON.stringify(updatedItems));

    this.cartItemSubject.next(updatedItems);
  }

  getAllItems() {
    return this.cartItemSubject.asObservable();
  }

  getTheSizeOfCartItem() {
    return this.cartItemSubject.value.length;
  }

  getData() {
    return this.cartItemSubject.value;
  }

  updateTheQunatity(product_id) {
    const currentItem = this.cartItemSubject.getValue();
    const ifExist = currentItem.findIndex(
      (item) => item.product_id === product_id
    );

    if (ifExist !== -1) {
      currentItem[ifExist].product_qantity =
        Number(currentItem[ifExist].product_qantity) + 1;
      this.cartItemSubject.next(currentItem);
      window.localStorage.setItem("cartData", JSON.stringify(currentItem));
    }
  }

  removeQuantity(product_id) {
    const currentItem = this.cartItemSubject.getValue();
    const ifExist = currentItem.findIndex(
      (item) => item.product_id === product_id
    );

    if (ifExist !== -1) {
      if (currentItem[ifExist].product_qantity === 0) {
        currentItem.splice(ifExist, 1);

        // Update localStorage
        window.localStorage.setItem("cartData", JSON.stringify(currentItem));
      } else {
        currentItem[ifExist].product_qantity =
          Number(currentItem[ifExist].product_qantity) - 1;
        this.cartItemSubject.next(currentItem);
        window.localStorage.setItem("cartData", JSON.stringify(currentItem));
      }
    }
  }

  getProductQuantityById(product_id) {
    const currentItem = this.cartItemSubject.getValue();
    const ifExist = currentItem.findIndex(
      (item) => item.product_id === product_id
    );

    if (ifExist !== -1) {
      return currentItem[ifExist].product_qantity;
    }
  }

  getTheTotal(){
    const allItem = this.cartItemSubject.getValue();
    let total =0;
      allItem.map((item) =>{
          return total = total+(item.product_qantity*item.product_price)
    }) 
    return total;
  }

  removeAllItem(){
    window.localStorage.clear();
    this.cartItemSubject.next([]);
  }

  async getProductId() {
    const productId = this.cartItemSubject.getValue();
    const id = productId.map(i => i.product_id);
    return await Promise.all(id);
}

async getProductIds() {
  const currentItems = this.cartItemSubject.getValue();
  const productIds = await currentItems.map(item => item.product_id);
  return  await productIds;
}

async getQuantity() {
  const currentItems = this.cartItemSubject.getValue();
  const quantity = await currentItems.map(item => item.product_qantity);
  return await quantity;
}

async getPerUnitPrice() {
  const currentItems = this.cartItemSubject.getValue();
  const perUnitPrice = await currentItems.map(item => item.product_price);
  return await perUnitPrice;
}
  

}

export default new CartObservabel();
