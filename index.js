// Display Nav

const navDisplayHome = document.getElementById('navDisplayHome');
const navDisplayNotes = document.getElementById('navDisplayNotes');
const navDisplayTasks = document.getElementById('navDisplayTasks');

let mainHome = document.getElementById('mainHome');
let notesHome = document.getElementById('notesHome');
let taskHome = document.getElementById('taskHome');

document.addEventListener("DOMContentLoaded", () => {
    mainHome.style.display = "none";
    notesHome.style.display = "flex";
    taskHome.style.display = "none"
})

navDisplayHome.addEventListener("click", () => {
    mainHome.style.display = "flex";
    notesHome.style.display = "none";
    taskHome.style.display = "none"
})

navDisplayNotes.addEventListener("click", () => {
    mainHome.style.display = "none";
    notesHome.style.display = "flex";
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

    reloadNotesList()
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
                        <img src="images/close.svg" alt="" srcset="">
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

//NotesSection 

let notesInput = document.getElementById('notesInput')
let notesAddBtn = document.getElementById('notesAddBtn')
let notesListUL = document.getElementById('notesListUL')


let notesList = []
let notesListLength = 0
let indexNotesObj = 0

function reloadNotesList() {
    let notesReloadList = notesList.map(function (note) {
        let localText = note.text
        let spliceText = localText.slice(0, 100);
        return `
        <div class="note" id="noteId${note.id}}" onclick="editNote(${note.id})">
        <p class="noteTitle">${note.title}</p>
            <p class="noteText">${spliceText}</p>
        </div>
        <div class="notesEdit" id="notesEdit${note.id}">
            <div class="notesEditTop">
                <input class="notesEditTitle" id="notesEditTitle${note.id}" spellcheck="false" minlength="3" maxlength="18" required id="notesEditTitle${note.id}" value="${note.title}" >
                <button class="notesEditCloseBtn" onclick="closeNote(${note.id})">
                    <img src="images/close.svg" alt="" srcset="">
                </button>
            </div>
            <textarea id="notesEditText${note.id}" name="notesEditText" class="notesEditText" cols="35" rows="10" spellcheck="false" placeholder="Insert your Text">${note.text}</textarea>
            <button class="noteDeleteBtn" onclick="deleteNote(this.value)" value="${notesList.indexOf(note)}">Delete Note</button>
        </div>



        `
    })
    notesReloadList = notesReloadList.join("")
    notesListUL.innerHTML = notesReloadList
    notesPaddingList()
}

notesAddBtn.addEventListener('click', () => {
    addNotesOnList()

})

function addNotesOnList() {

    if (notesInput.value === "") {
        popUpErrorNotes()
    } else {

        notesList.push({ id: indexNotesObj, })
        notesList[indexNotesObj].title = notesInput.value
        notesList[indexNotesObj].text = " "
        indexNotesObj++

        notesListLength++
        reloadNotesList()
        notesPaddingList()
    }
}

function popUpErrorNotes() {
    let popUpWindowNotes = document.getElementById('popUpWindowNote')
    popUpWindowNotes.style.display = "flex"
    setTimeout(() => {
        popUpWindowNotes.style.opacity = "100%"
    }, "1");

    setTimeout(() => {
        popUpWindowNotes.style.opacity = "0%"
    }, "2000");

    setTimeout(() => {
        popUpWindowNotes.style.display = "none"
    }, "3000");
}

function notesPaddingList() {
    if (notesListLength > 0) {
        notesListUL.classList.add('notesActive')
    } else (
        notesListUL.classList.remove('notesActive')
    )
}

notesInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        addNotesOnList()
    }
})

function deleteNote(value) {
    delete notesList[value]
    notesListLength--
    reloadNotesList()
}

function editNote(note) {
    let editNote = document.querySelector(`div#notesEdit${note}`)
    editNote.style.display = "flex"
}

function closeNote(note) {
    let editNote = document.querySelector(`div#notesEdit${note}`)
    editNote.style.display = "none"

    //get text 
    let currentNoteTitle = document.getElementById(`notesEditTitle${note}`).value
    notesList[note].title = currentNoteTitle

    let currentNoteText = document.getElementById(`notesEditText${note}`).value
    notesList[note].text = currentNoteText

    reloadNotesList()
}

