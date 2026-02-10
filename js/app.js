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
  const items = getItems();
  const newItems = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i].id != id) {
      newItems.push(items[i]);
    }
  }

  saveItems(newItems);
  renderItems();
}

$app.on("click", ".remove-btn", function () {
  const id = $(this).closest(".single-item").data("id");
  deleteItem(id);
});

//toggle completed
$app.on("change", "input[type=checkbox]", function () {
  const id = $(this).closest(".single-item").data("id");

  const items = getItems().map((item) =>
    item.id === id ? { ...item, completed: this.checked } : item,
  );

  saveItems(items);
  renderItems();
});

//update items
// Update item function without map
function updateItem(id, newValue) {
  if (!newValue.trim()) {
    renderItems();
    return;
  }

  const items = getItems();

  for (let i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      items[i].name = newValue.trim();
      console.log(newValue);
      break;
    }
  }

  saveItems(items);
  renderItems();
}

$app.on("click", ".edit-btn", function () {
  const $itemDiv = $(this).closest(".single-item");
  const id = $itemDiv.data("id");
  const $textP = $itemDiv.find("p");
  const oldValue = $textP.text().trim();

  const $inputE1 = $(`<input type="text" class="item-input" />`).val(oldValue);
  $textP.replaceWith($inputE1);
  $inputE1.focus();

  $inputE1.on("blur", function () {
    updateItem(id, $inputE1.val());
  });

  $inputE1.on("keydown", function (e) {
    if (e.key === "Enter") $inputE1.blur();
  });
});

$(document).ready(renderItems);
