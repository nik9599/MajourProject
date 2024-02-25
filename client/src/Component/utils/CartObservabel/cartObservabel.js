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
      (item) => item.product_id == product_id
    );

    if (ifExist != -1) {
      currentItem[ifExist].product_qantity =
        Number(currentItem[ifExist].product_qantity) + 1;
      this.cartItemSubject.next(currentItem);
      window.localStorage.setItem("cartData", JSON.stringify(currentItem));
    }
  }

  removeQuantity(product_id) {
    const currentItem = this.cartItemSubject.getValue();
    const ifExist = currentItem.findIndex(
      (item) => item.product_id == product_id
    );

    if (ifExist != -1) {
      if (currentItem[ifExist].product_qantity == 0) {
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
}

export default new CartObservabel();
