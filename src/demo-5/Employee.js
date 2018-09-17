import React, { Component } from "react";
import { decorate, observable } from "mobx";
import { observer } from "mobx-react";

class Store {
  employeesList = [
    { name: "John Doe", salary: 150 },
    { name: "Richard Roe", salary: 225 }
  ];
}
decorate(Store, {
  employeesList: observable
});

const appStore = new Store();

class TodoApp extends Component {
  render() {
    return (
      <div>
        {/* <Table store={appStore} /> */}
        {/* <Controls store={appStore} /> */}
      </div>
    );
  }
}

// const Table = observer(({ store }) => (
//   <tbody>{store.employeesList.map((e, i) => <Row key={i} data={e} />)}</tbody>
// ));

// const Controls = observer (class Controls extends Component {
//     addEmployee = ()=> {
//       const name = prompt("The name:")
//       const salary = prompt("The salary:")
//       this.props.store.employeesList.push({name, email})
//       // ERROR !!! this will not update the view
//     }

//     clearList = ()=> {
//       this.props.store.employeesList = []
//       // ERROR !!! this will not update the view
//     }

//     render() {
//       return(<div className="controls">
//         <button>clear table</button>
//         <button>add record</button>
//       </div>)
//     }
//   })
