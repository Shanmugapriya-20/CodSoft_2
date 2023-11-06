document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const taskList = document.getElementById("tasks");
    const newTaskInput = document.getElementById("new-task");

    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-task" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
        addDeleteListeners();
    }

    function addDeleteListeners() {
        const deleteButtons = document.querySelectorAll(".delete-task");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });
        });
    }

    renderTasks();

    document.getElementById("add-task").addEventListener("click", () => {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            updateLocalStorage();
            renderTasks();
            newTaskInput.value = "";
        }
    });
});
