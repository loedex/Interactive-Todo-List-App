const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

let tasks = [];
let currentFilter = "all";

//Adding Task
inputBox.addEventListener("keydown", (e)=>{
    if(e.target === "Enter"){
        addTask();
    }
});


function addTask() {
    const text = inputBox.value.trim();
    if(text===""){
        alert("PLease enter a task first");
        return;
    }
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask)
    taskInput.value="";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML=``;
    let filteredTasks = tasks.filter((t)=>{
        if(currentFilter === "active"){
            return t.completed === false;
        }
        if(currentFilter === "completed"){
            return t.completed === true;
        }
        return true;
    });
    if(filteredTasks.length === 0){
        taskList.innerHTML = `<p>No Tasks here yet</p>`;
        return;
    }
    filteredTasks.forEach((t)=>{
        const li = document.createElement('li');
        li.className = t.completed ? "task-item completed" : "task-item";
        li.innerHTML = `<span class="task-text">${t.text}</span>
        <button class="complete-btn" data-id="${t.id}">${t.completed ? "Undo" : "Complete"}</button>
        <button class="delete-btn" data-id="${t.id}">Delete</button>
        `;
        taskList.appendChild(li);
    });
    
}

function toggleComplete(id) {
    tasks = tasks.map((t)=>{
        if(t.id === id){
            return {...t,completed:!t.completed};
        }
        return t;
    });
    renderTasks();
    saveTasks();
}

function deleteTask(id) {
    tasks = tasks.filter((t)=>{
        return t.id !== id;
    });
    renderTasks();
    saveTasks();
}



addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        addTask();
    }
});

taskList.addEventListener("click",(e)=>{
    const clickedBtn = e.target;
    const taskId = Number(clickedBtn.dataset.id);
    if(clickedBtn.classList.contains("complete-btn")){
        toggleComplete(taskId);
    }
    if(clickedBtn.classList.contains("delete-btn")){
        deleteTask(taskId);
    }
});

const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        currentFilter = btn.dataset.filter;
        filterBtns.forEach((b)=>{
            b.classList.remove("active-filter");
        });
        btn.classList.add("active-filter");
        renderTasks();
    })
})

//Save to local storage
function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
//load from local storage on page start
const savedTasks = localStorage.getItem("tasks");
if(savedTasks !== null){
    tasks = JSON.parse(savedTasks);
}
renderTasks();

