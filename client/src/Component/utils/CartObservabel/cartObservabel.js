import { BehaviorSubject } from "rxjs";

class CartObservabel {

  constructor() {
    this.cartItemSubject = new BehaviorSubject([]);
  }

  addItem(item) {
    const currentItems = this.cartItemSubject.getValue();
    const updatedItems = [...currentItems, item];
    this.cartItemSubject.next(updatedItems);
  }

  getAllItems() {
    return this.cartItemSubject.asObservable();
  }
}

export default new CartObservabel();
