const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

let tasks = [];
let currentFilter = "all";

//Adding Task
inputBox.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
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
        status: false
    };
    tasks.push(newTask)
    inputBox.value="";
    renderTasks();
}

function setFilter(filterType) {
    currentFilter = filterType;
    renderTasks();
    
}
function renderTasks() {
    listContainer.innerHTML=``;
    let filteredTasks = tasks.filter((t)=>{
        if(currentFilter === "completed"){
            return t.status === "completed";
        }
        return true;
    });
    if(filteredTasks.length === 0){
        listContainer.innerHTML = `<p>No Tasks here yet</p>`;
        return;
    }
    filteredTasks.forEach((t)=>{
        const li = document.createElement('li');
        li.textContent = t.text;
        li.dataset.id = t.id;
        if(t.status === "completed"){
            li.classList.add("checked");
        }
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
    
}


listContainer.addEventListener("click",(e)=>{
    const clickedElement = e.target;
    const liElement = clickedElement.closest("li") ;
    if(!liElement) return;
    const clickedId = Number(liElement.dataset.id);

    if(clickedElement.tagName === "LI"){
        const targetTask = tasks.find(t  => t.id === clickedId);
        targetTask.status = targetTask.status === "completed" ? "active" : "completed";
    }
    else if(clickedElement.tagName === "SPAN"){
        tasks = tasks.filter(t => t.id !== clickedId);
    }
    renderTasks();
});

