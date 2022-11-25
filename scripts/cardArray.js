const todoList = [
  {
    title: "Работать",
  },
  {
    title: "Еще работать",
  },
  {
    title: "Прекратить работать",
  },
];

const todoListElement = document.querySelector(".todo__list");
const todoTemplate = document.querySelector("#todo-template").content;
const form = document.querySelector(".form");
const formInput = document.querySelector('[name="place-name"]');

function createElement(data) {
  const todo = todoTemplate.querySelector(".todo__item").cloneNode(true);
  const todoTitle = todo.querySelector(".todo__title");
  const todoDeleteButton = todo.querySelector(".todo__delete-button");
  const todoLikeButton = todo.querySelector(".todo__like-button");

  todoDeleteButton.addEventListener("click", (e) => {
    e.target.closest(".todo__item").remove();
  });

  todoLikeButton.addEventListener("click", (e) => {
    e.target.classList.toggle(".");
  });

  todoTitle.textContent = data.title;

  return todo;
}

const renderTodo = (item, wrapElement) => {
  const element = createElement(item);
  wrapElement.append(element);
};

todoList.forEach((item) => {
  renderTodo(item, todoListElement);
});

const handleFormSubmit = (e) => {
  e.preventDefault();
  const todo = {
    title: formInput.value,
  };
  renderTodo(todo, todoListElement);
};

form.addEventListener("submit", handleFormSubmit);
