$(document).ready(function () {
  const app = $(".app");
  const input = $("#item-input");

  function getItems() {
    return JSON.parse(localStorage.getItem("groceryItems")) || [];
  }

  function saveItems(items) {
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }

  //render items
  function renderItems() {
    app.html(""); // clear existing

    const items = getItems();

    items.forEach((item) => {
      const singleItem = $(`
        <div class="single-item" data-id="${item.id}">
          <input type="checkbox" ${item.completed ? "checked" : ""} />
          <p style="${item.completed ? "text-decoration: line-through;" : ""}">
            ${item.name}
          </p>
          <button class="btn icon-btn edit-btn" type="button">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn icon-btn remove-btn" type="button">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `);

      app.append(singleItem);
    });
  }

  //add item

  $(".input-items").on("submit", function (e) {
    e.preventDefault();

    const name = input.val().trim();
    if (!name) return;

    const items = getItems();

    const newItem = {
      id: Date.now().toString(),
      name,
      completed: false,
    };

    items.push(newItem);
    saveItems(items);

    input.val("");
    renderItems();
  });
});
