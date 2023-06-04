// 1. Добавление новой задачи 
const form = document.querySelector("#addForm");
const itemsList = document.querySelector("#items");
const filter = document.querySelector("#filter");

//Прослушка основной функции
form.addEventListener('submit', addItem);

// 2. Удаление элементов 
itemsList.addEventListener("click", removeItem);

// 3. Нахождение элемент по поиску 
filter.addEventListener("keyup", filterItems);

//Функция основная
function addItem(e) {
    //Отменяем отправку формы
    e.preventDefault();
    // Находим инпут с текстом для новой задачи
    const newItemInput = document.querySelector("#newItemText");
    // Получаем текст из инпута
    const newItemText = newItemInput.value;

    // Создаем элемент для новой задачи 
    const newElement = document.createElement("li");
    newElement.className = "list-group-item";

    // Добавим текст в новый элемент 
    const newTextNode = document.createTextNode(newItemText);
    newElement.appendChild(newTextNode);

    // Создаем кнопку
    const deleteBtn = document.createElement("button");
    // Добавляем текст в кнопку
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    // Добавляем CSS class
    deleteBtn.className = "btn btn-light btn-sm float-right";
    // Добавляем data-атрибуты
    deleteBtn.dataset.action = "delete";

    // Помещаем кнопку внутри тега li
    newElement.appendChild(deleteBtn);
    // Добавляем задачу в список со всеми задачами 
    itemsList.prepend(newElement);
    // Очистить поле ввода
    newItemInput.value = "";

};

//Функция для удаления элемента
function removeItem(event) {
    if (event.target.hasAttribute("data-action") && event.target.getAttribute("data-action") == "delete") {
        if (confirm("Вы уверены что стоит удалить задачу?")) {
            event.target.parentNode.remove();
        }
    }
};

// Фильтрация списка дел - функция
function filterItems(event){
    // Получаем фразу для поиска и переводим ее в нижний регистр
    const searchedText = event.target.value.toLowerCase();
    // 3.1 Получаем список всех задач 
    const items = itemsList.querySelectorAll("li");
    // Перебираем циклом все li в списке задач 
    items.forEach(function(item) {
        // Получаем текст задачи из списка и переводим его в нижний регистр 
        const itemText = item.firstChild.textContent.toLowerCase();
        // Проверяем на вхождение искомой подстроки в текст задачи
        if(itemText.indexOf(searchedText) !== -1)  {
            // Если вхождение есть - показываем тег
            item.style.display = "block";
        } else {
             // Если вхождение нет - скрываем элемент с задачей
            item.style.display = "none";
        }
    });
};




