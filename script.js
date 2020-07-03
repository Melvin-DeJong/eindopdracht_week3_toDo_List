
const getTasks = async () => {
    const tasks = await someCallToGetAllTasks();

    const ul = document.getElementById('todolist');

    const listItems = tasks.map((task) => {
        const li = document.createElement('li');
        li.innerHTML = task.description;
        const checkbox = document.createElement('input');
        checkbox.type="checkbox";
        const button = document.createElement('button');
        button.value = task.id;
        button.textContent = "Delete";
        button.className = "deleteBttn"
        button.addEventListener("click", deleteTask);
        li.appendChild(button);
        li.appendChild(checkbox);
        return li;
    });

    listItems.forEach(task => {
        ul.appendChild(task);
    });
}

const removeTasksFromDOM = () => {
    const ul = document.getElementById("todolist");
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    };
}

const reloadDOM = () => {
    removeTasksFromDOM();
    getTasks();
}

const addTask = async () => {
    const input = document.getElementById("input");
    const description = input.value;
    if (description != "") {
        const task = {
            description: description,
            done: false
        };
        const taskResult = await clientAddTask(task);
         console.log("result:", taskResult);
        input.value = "";
        reloadDOM();
    }
}

const deleteTask = async (event) => {
    const id = event.target.value;
    console.log("id to delete:", id);
    if (id != "") {
        await clientDeleteTask(id);
        reloadDOM();
    }
}

const buttonAddTask = document.getElementById("bttnAddTask");
buttonAddTask.addEventListener("click", addTask);

getTasks();