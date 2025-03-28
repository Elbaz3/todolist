const inputTask = document.querySelector(".enter-task");
const addTask = document.querySelector(".add");
const tasks = document.querySelector(".tasks");

addTask.addEventListener("click", () => {
    if (inputTask.value) {
        let uniqeClass = new Date().getMilliseconds();
        let taskContent = inputTask.value
        createTask(taskContent, uniqeClass)
        setLocalStorage(taskContent, uniqeClass)
        inputTask.value = ""
    }
});

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        let targetClass = e.target.parentElement.classList[1]
        deleteFromLocalStorage(targetClass)
        e.target.parentElement.remove()

    } else if (e.target.classList.contains("edit")) {
        let parentClass = [...e.target.parentElement.classList][1];
        let paragraph = document.querySelector(`.${parentClass} .task-text`);
        paragraph.style.cssText = "background: linear-gradient(135deg, #4f03a6 10%, #3d08d1 100%); color: white; border-radius: 20px;"
        let done = document.createElement("i");
        done.className = "fa-solid fa-check done";

        let task = document.querySelector(`.${parentClass}`);
        task.append(done)

        paragraph.setAttribute("contenteditable", "true");


    } else if (e.target.classList.contains("done")) {
        let parentClass = [...e.target.parentElement.classList][1];

        let paragraph = document.querySelector(`.${parentClass} .task-text`);
        paragraph.setAttribute("contenteditable", "false");
        paragraph.style.cssText = "background-color: transparent; color: #222; border-radius: 0;"
        e.target.remove()
        changeTaskAtLocalStorage(paragraph.textContent, parentClass)
    } else if ((e.target.classList.contains("check"))) {
        if (e.target.checked) {
            let parent = [...e.target.parentElement.classList][1];
            let nextP = document.querySelector(`.${parent} p`)
            nextP.style.textDecorationLine = "line-through"
            checkedAtLocalStorage(parent)
        } else {
            let parent = [...e.target.parentElement.classList][1];
            let nextP = document.querySelector(`.${parent} p`)
            nextP.style.textDecorationLine = "none"
            unCheckedAtLocalStorage(parent)

        }
    }
})

function createTask (value, uniqeClass, checked) {
    let task = document.createElement("div");
    task.className = `task T${uniqeClass}`;
    let radio = document.createElement("input");
    radio.setAttribute("type", "checkbox");
    radio.className = "check";
    let p = document.createElement("p");
    p.className = "task-text"
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash delete";
    let editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square edit";
    let taskValue = document.createTextNode(value);
    p.appendChild(taskValue);
    task.append(radio, p, editIcon, deleteIcon);
    tasks.appendChild(task);
    
    if (checked) {
        let nextP = document.querySelector(`.T${uniqeClass} p`)
        let parent = document.querySelector(`.T${uniqeClass} .check`)
        parent.checked = true
        nextP.style.textDecorationLine = "line-through"
    }
}

function setLocalStorage(value, uniqeClass) {
    let newTask = {value, class: uniqeClass, checked: false}
    let tasks = JSON.parse(localStorage.getItem('tasks'))  || null
    if (tasks === null) {
        localStorage.setItem('tasks', '[]')
        let newtasks = JSON.parse(localStorage.getItem('tasks'))
        newtasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(newtasks))
    } else {
        tasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}


function getFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || null
    
    if (tasks) {
        tasks.forEach((task) => {
            createTask(task.value, task.class, task.checked)
        })
    }

}
function deleteFromLocalStorage(className) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))|| null
    let filteredTasks = tasks.filter(el => el.class != className.slice(1))
    localStorage.setItem('tasks', JSON.stringify(filteredTasks))

}
function changeTaskAtLocalStorage(value, className) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))|| null
    let filteredTasks = tasks.map(el => el.class == className.slice(1) ? { ...el, value} : el)
    localStorage.setItem('tasks', JSON.stringify(filteredTasks))

}

function checkedAtLocalStorage(className) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))|| null
    let filteredTasks = tasks.map(el => el.class == className.slice(1) ? { ...el, checked: true} : el)
    localStorage.setItem('tasks', JSON.stringify(filteredTasks))

}
function unCheckedAtLocalStorage(className) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))|| null
    let filteredTasks = tasks.map(el => el.class == className.slice(1) ? { ...el, checked: false} : el)
    localStorage.setItem('tasks', JSON.stringify(filteredTasks))

}

getFromLocalStorage()