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

let indexTaskObj = 0
let taskList = []
//

function reloadTaskList() {
    let taskListMap = taskList.map(function (task) {
        return `
        <div class="task">
            <p class="taskItem">${task.title}</p>

            <button class="taskNoteBtn" value="${taskList.indexOf(task)}" onclick="editTask(this.value)">
                <img src="images/iconNotes.svg">
            </button>

            <button class="deleteBtn" value="${taskList.indexOf(task)}" onclick="deleteTask(this.value)">
                <img src="images/deleteIcon.svg">
            </button>

            <div class="taskEdit" id="taskEdit${task.id}">
                <div class="taskEditTop">
                    <input class="taskEditTitle" value="${task.title}" spellcheck="false" id="taskTitle${taskList.indexOf(task)}">
                    <button class="taskEditCloseBtn" value="${taskList.indexOf(task)}" onclick="closeTask(this.value)">
                        <img src="/images/close.svg" alt="" srcset="">
                    </button>
            </div>
                <textarea name="taskEditText" id="taskEditText${task.id}" class="taskEditText" cols="35" rows="10" spellcheck="false" placeholder="Insert your Text">${task.text}</textarea>
            </div>
        </div>


        `

    })
    taskListMap = taskListMap.join("")
    listUL.innerHTML = taskListMap
}

function addTaskOnList() {
    if (taskInput.value === "") {
        window.alert('insira')
    } else {
        taskList.push({ id: indexTaskObj, })
        taskList[indexTaskObj].title = taskInput.value
        taskList[indexTaskObj].text = ""

        indexTaskObj++

        taskInput.value = ''
        taskInput.focus()
        //localStorage.setItem("taskList", JSON.stringify(taskList));
        //Adicionar no HTML
        reloadTaskList()
    }
}


taskAddBtn.addEventListener('click', () => {
    addTaskOnList()
    console.table(taskList)
})


function deleteTask(value) {
    delete taskList[value]
    reloadTaskList()
}


function editTask(value) { 
    let editMenu = document.querySelector(`div#taskEdit${taskList[value].id}`)
    editMenu.style.display = "flex"
}

function closeTask(value) {
    let editMenu = document.querySelector(`div#taskEdit${taskList[value].id}`)
    editMenu.style.display = "none"

    //get text
    let currentTaskTitle = document.getElementById(`taskTitle${value}`).value
    taskList[value].title = currentTaskTitle

    let currentTaskText = document.getElementById(`taskEditText${value}`).value
    taskList[value].text = currentTaskText
    reloadTaskList()
}
