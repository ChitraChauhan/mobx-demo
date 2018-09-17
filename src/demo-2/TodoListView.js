import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { decorate, observable, computed } from "mobx";

class Todo {
  id = Math.random();
  title = "";
  finished = false;
}

decorate(Todo, {
  title: observable,
  finished: observable
});

class TodoList {
  todos = [];
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

decorate(TodoList, {
  todos: observable,
  unfinishedTodoCount: computed
});

const TodoListView = observer (class TodoListView extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
})

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      defaultChecked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

const store = new TodoList();

store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);

store.todos[0].finished = true;

// For Eval button
window.store = store;

ReactDOM.render(
  <TodoListView todoList={store} />,
  document.getElementById("root")
);

// const Timer = observer(class Timer extends React.Component { /* ... */ }) 