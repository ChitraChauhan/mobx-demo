import React, { Component } from "react";
import { decorate, observable, computed } from "mobx";
import { observer } from "mobx-react";
import ReactDOM from "react-dom";

class Order {
  price = 0;
  amount = 1;

  constructor(price) {
    this.price = price;
  }

  get total() {
    return this.price * this.amount;
  }

  set total(total) {
    this.price = total / this.amount; // infer price from total
  }
}

decorate(Order, {
  price: observable,
  amount: observable,
  total: computed
});

const TodoOrder = observer(({ store }) => (
  <div>
    {console.log(store.total)}
    <div>Price: {store.total}</div>
  </div>
));

const store = new Order();

const OrderLine = observer(
  class OrderLine extends Component {
    render() {
      return <TodoOrder store={store} />;
    }
  }
);

ReactDOM.render(<OrderLine store={store} />, document.getElementById("root"));
