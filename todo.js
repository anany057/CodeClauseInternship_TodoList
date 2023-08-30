let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
function fetchTodos(){

  //GET REQUEST
  //fetch will return promis
fetch('https://jsonplaceholder.typicode.com/todos')
.then(function(response){
  // console.log(response);//it is and response object and we need to convert it into json
  return response.json();//give us promise
}).then(function(data){
  // console.log(data);
  tasks=data.slice(0,5);
  renderList();
})
.catch(function(error){
  console.log('error',error);
})


}
console.log("Working");

function addTaskToDOM(task){

    const li= document.createElement('li');
    li.innerHTML=`
    
    <input type="checkbox" id="checkbox-${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
<label for="checkbox-${task.id}">${task.title}</label>
<i class="fa-solid fa-trash-can delete" id="delete-${task.id}" style="color: #ff0000;"></i>

    
  `;

    tasksList.append(li);

}

function renderList() {

tasksList.innerHTML='';

for(var i=0;i<tasks.length;i++)
{
    addTaskToDOM(tasks[i]);
}

tasksCounter.innerHTML=tasks.length;
}

function toggleTask(taskId) {

   const task= tasks.filter(function(tasks){

       return tasks.id===Number(taskId);
    });

    if(task.length>0){
const currentTask=task[0];
currentTask.completed=!currentTask.completed;
renderList();
showNotification('Task toggled successfully');
return;

    }

    showNotification('Could not toggle the task');

}

function deleteTask(taskId) {

    const newTasks=tasks.filter(function(task){
        return task.id !=Number(taskId);
    })
    tasks=newTasks;
    renderList();
    showNotification('Task has been deleted succesfully');
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
  }
  showNotification("task cannot be added");
}

function showNotification(title) {
  alert(title);
}

function handInputKeyPress(e) {
  if (e.key === "Enter") {
    const title = e.target.value;

    if (!title) {
      showNotification("Task cannot be empty");
      return;
    } else {
      const task = {
        title: title,
        id: Date.now(),
        completed: false,
      };

      e.target.value = "";
      addTask(task);
    }
  }
}


function handleClickListener(e){
  const target2=e.target;
  console.log(target2);
  if (target2.classList.contains('delete')) {
    const taskId = target2.id.split('-')[1]; // Extract the task ID from the ID attribute
    deleteTask(taskId);
    return;
  }

  else if(target2.className==='custom-checkbox'){
 const taskId=target2.id;
toggleTask(taskId);
return;
  }

}
// the below fucntion handles the click events
function initialzeApp(){
fetchTodos();
addTaskInput.addEventListener("keyup", handInputKeyPress);
document.addEventListener('click',handleClickListener);
};

initialzeApp();