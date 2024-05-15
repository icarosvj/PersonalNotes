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
let taskDateToday = document.getElementById('taskDateToday')

let indexTaskObj = 0
let taskList = []
let listLength = taskList.length
//
document.addEventListener('DOMContentLoaded', () => {
    setDayTask()
    reloadTaskList()
})

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
                    <input class="taskEditTitle" value="${task.title}" spellcheck="false" id="taskTitle${taskList.indexOf(task)}" minlength="3" maxlength="18" required >
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
    paddingList()

}

function addTaskOnList() {
    if (taskInput.value === "") {
        popUpError()
    } else {
        taskList.push({ id: indexTaskObj, })
        taskList[indexTaskObj].title = taskInput.value
        taskList[indexTaskObj].text = ""

        indexTaskObj++
        listLength++

        taskInput.value = ''
        taskInput.focus()
        localStorage.setItem("taskList", JSON.stringify(taskList));
        //Adicionar no HTML
        reloadTaskList()
    }
}

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTaskOnList()
    }
})

taskAddBtn.addEventListener('click', () => {
    addTaskOnList()
})

function deleteTask(value) {
    delete taskList[value]
    listLength--
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

function paddingList() {
    console.log(listLength)
    if (listLength != 0) {
        listUL.classList.add('ListULActive')
    } else {
        listUL.classList.remove('ListULActive')
    }
}

function setDayTask() {
    let todayDate = new Date()
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentMonth = month[todayDate.getMonth()]
    let currentDay = todayDate.getDate()

    console.log(todayDate)
    taskDateToday.innerHTML = `Today, ${currentMonth} ${currentDay}.`
}

function popUpError() {
    let popUpWindow = document.getElementById('popUpWindow')
    popUpWindow.style.display = "flex"
    setTimeout(() => {
        popUpWindow.style.opacity = "100%"
    }, "1");

    setTimeout(() => {
        popUpWindow.style.opacity = "0%"
    }, "2000");

    setTimeout(() => {
        popUpWindow.style.display = "none"
    }, "3000");
}