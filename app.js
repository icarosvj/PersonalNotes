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

taskList = []

//

function reloadTaskList() {
    let taskListMap = taskList.map(function(task)
    {
        return `
        <p class="taskItem">${task}</p>
        
        <button class="taskNoteBtn" value="">
            <img src="images/iconNotes.svg">
        </button>

        <button class="deleteBtn" value="">
            <img src="images/deleteIcon.svg">
        </button>
        `
    
    })
}

