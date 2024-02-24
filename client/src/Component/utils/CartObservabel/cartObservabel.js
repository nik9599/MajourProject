import { BehaviorSubject } from "rxjs";

class CartObservabel {

  constructor() {
    this.cartItemSubject = new BehaviorSubject([]);
  }

  addItem(item) {
    const currentItems = this.cartItemSubject.getValue();
    const updatedItems = [...currentItems, item];
    this.cartItemSubject.next(updatedItems);

    // Check if the number of items remains the same
    if (updatedItems.length === currentItems.length) {
      // Notify observers
      this.cartItemSubject.next(updatedItems);
    }
  }

  getAllItems() {
    return this.cartItemSubject.asObservable();
  }

  getTheSizeOfCartItem(){
    return this.cartItemSubject.value.length;
  }
  
  getData(){
    return this.cartItemSubject.value
  }

}

export default new CartObservabel();
