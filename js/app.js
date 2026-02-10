console.log("jQuery loaded");

const $form = $(".input-items");
const $input = $("#item-input");
const $app = $(".app");
function getItems() {
  return JSON.parse(localStorage.getItem("groceryItems")) || [];
}

function saveItems(items) {
  localStorage.setItem("groceryItems", JSON.stringify(items));
}

//render items
function renderItems() {
  $app.empty();
  const items = getItems();

  items.forEach((item) => {
    const $div = $(`
      <div class="single-item" data-id="${item.id}">
        <input type="checkbox" ${item.completed ? "checked" : ""} />
        <p class="${item.completed ? "completed" : ""}">${item.name}</p>
        <button class="btn icon-btn edit-btn" type="button">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn icon-btn remove-btn" type="button">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `);

    $app.append($div);
  });
}

//add item
$form.on("submit", function (e) {
  e.preventDefault();

  const value = $input.val().trim();
  if (!value) {
    alert("Please add some input");
    return;
  }

  const items = getItems();
  items.push({
    id: Date.now().toString(),
    name: value,
    completed: false,
  });

  saveItems(items);
  $input.val("");
  renderItems();
});

//delete item
function deleteItem(id) {
  const items = getItems().filter((item) => item.id !== id);
  saveItems(items);
  renderItems();
}

$app.on("click", ".remove-btn", function () {
  const id = $(this).closest(".single-item").data("id");
  deleteItem(id);
});

$(document).ready(renderItems);
