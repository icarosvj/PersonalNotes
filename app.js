// Display Nav

const navDisplayHome = document.getElementById('navDisplayHome');
const navDisplayNotes = document.getElementById('navDisplayNotes');
const navDisplayTasks = document.getElementById('navDisplayTasks');

let mainHome = document.getElementById('mainHome');
let notesHome = document.getElementById('notesHome');
let taskHome = document.getElementById('taskHome');

document.addEventListener("DOMContentLoaded", () => {
    mainHome.style.display = "none";
    notesHome.style.display = "none";
    taskHome.style.display = "flex"
})

navDisplayHome.addEventListener("click", () => {
    mainHome.style.display = "flex";
    notesHome.style.display = "none";
    taskHome.style.display = "none"
})

navDisplayNotes.addEventListener("click", () => {
    mainHome.style.display = "none";
    notesHome.style.display = "block";
    taskHome.style.display = "none"
})

navDisplayTasks.addEventListener("click", () => {
    mainHome.style.display = "none";
    notesHome.style.display = "none";
    taskHome.style.display = "flex"
    taskHome.classList.add = "active"
})

// Tasks

let taskInput = document.getElementById('taskInput')
let taskAddBtn = document.getElementById('taskAddBtn')
let listUL = document.getElementById('listUL')

taskList = []

//

function reloadTaskList() {
    let taskListMap = taskList.map(function (task) {
        return `
        <div class="task">
            <p class="taskItem">${task}</p>

            <button class="taskNoteBtn">
                <img src="images/iconNotes.svg">
            </button>

            <button class="deleteBtn" value="${taskList.indexOf(task)}">
                <img src="images/deleteIcon.svg">
            </button>
        </div>
        `

    })
    taskListMap = taskListMap.join("")
    listUL.innerHTML = taskListMap
    console.table(taskList)
}

function addTaskOnList() {
    if (taskInput.value === "") {
        window.alert('insira')
    } else {
        taskList.push(taskInput.value)
        taskInput.value = ''
        taskInput.focus()
        console.log(taskList)
        //Adicionar no HTML
        reloadTaskList()
    }
}


taskAddBtn.addEventListener('click', () => {
    addTaskOnList()
})