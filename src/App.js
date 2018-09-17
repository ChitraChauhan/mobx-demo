import React, { Component } from "react";

import { decorate, observable, computed, action } from "mobx";
import { observer } from "mobx-react";

//class 1
class Todo {
  id = Math.random();
  title = "";
  finished = false;
  constructor(title) {
    this.title = title;
  }
}

decorate(Todo, {
  title: observable,
  finished: observable,
});

//class 2
class TodoStore {
  todos = [];
  todo = {
    title: "",
  };

  add(title) {
    this.todos.push(new Todo(title));
  }

  get unfinished() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

decorate(TodoStore, {
  todos: observable,
  todo: observable,
  add: action,
  unfinished: computed,
});


const TodoItem = observer(({ todo }) => (
  <li onClick={e => (store.todo = todo)}>
    <input
      type="checkbox"
      checked={todo.finished}
      onChange={e => (todo.finished = !todo.finished)}
    />{" "}
    {todo.title}
  </li>
));

const TodoEditor = observer(({ store }) => {
  let input;
  let todo = store.todo;
  return (
    <div>
    <h3>TodoList in Mobx</h3>
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!store.todo.id) {
          store.add(input.value);
        }
        store.todo = { title: "" };
        input.focus();
      }}>
      <input
        type="text"
        ref={node => (input = node)}
        value={todo.title}
        onChange={e => (todo.title = e.target.value)}
      />
      {todo.id ? <button>Update</button> : <button>Add</button>}
    </form>
    </div>
  );
});

const TodoList = observer(({ store }) => (
  <div>
    <TodoEditor store={store} />
    <ul>{store.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>
    <div>Pending tasks: {store.unfinished}</div>
  </div>
));

const store = new TodoStore();

class TodoApp extends Component {
  render() {
    return <TodoList store={store} />;
  }
}

export default TodoApp;