import {
  openModal,
  closeModal,
  clickOutside,
  clearTodo
} from "./modal.js";

//select elements
const clearBtn = document.getElementById("clearBtn");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const addBtn = document.querySelector(".add-to-do button");

const pendingTasks = document.getElementById("pendingTasks");

// MODAL VARIABLES
// Get modal element
// var modal = document.getElementById('simpleModal');
// Get open modal button
// var clearBtn = document.getElementById('clearBtn');
// Get close button
  var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for open click
clearBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for Outside click
window.addEventListener('click', clickOutside);

yesBtn.addEventListener('click', clearTodo);
noBtn.addEventListener('click', closeModal);

// MODAL END

//classes names
const CHECK = "checkedBtn";
const UNCHECK = "uncheckBtn";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
	LIST = JSON.parse(data);
	id = LIST.length; // set the id to the last one in the list
	loadList(LIST); // load the list to the user interface
}else{
	//if data isn't empty
	LIST = [];
	id = 0; //
}

//load items to the user's interface
function loadList(array){
	array.forEach(function(item){
		addTodo(item.name, item.id, item.done, item.trash);
	});
}

// // clear the local storage
// clearBtn.addEventListener("click",function(){
// 	localStorage.clear();
// 	location.reload();
// });

//show todays date
const options = {weekday : "long", month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleString("en-US", options);

//Add a to-do function
function addTodo(toDo, id, done, trash){

	if(trash){ return;}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const text = `<li class="item">
					<button class="${DONE}" job="complete" id="${id}"></button>
					<p class="text ${LINE}">${toDo}</p>
					<button class="delBtn" job="delete" id="${id}"></button>
				</li>
				`;

	const position = "beforeend";

	list.insertAdjacentHTML(position,text);
}

//addTodo("Drink Coffee");

//add an item to the list user the enter key
document.addEventListener("keyup",function(event){
	if(event.key === "Enter"){
		const toDo = input.value;

		// if the input isn't empty && //if the user value isn't only spaces
		if(toDo && toDo.trim() !=0){
			addTodo(toDo, id, false, false);

			LIST.push({
				name : toDo,
				id : id,
				done : false,
				trash : false
			});

			//add item to localstorage (this code must be added where the LIST array is updated)
			localStorage.setItem("TODO", JSON.stringify(LIST));

			id++;
		}
		input.value = "";
		// Get the total pending tasks
    
		// pendingTasks.textContent = LIST.length;  //passing the array length in pendingtask
    // // pendingTasks.textContent = getnumTask;
    // console.log(getnumTask);
    let getnumTask = LIST.filter((falseTrash) => falseTrash.trash === false).length;
    // console.log(getnumTask);
    pendingTasks.textContent = getnumTask;
	}
});

//add button is clicked

addBtn.onclick = function(){
	const toDo = input.value;

	// if the input isn't empty && //if the user value isn't only spaces
		if(toDo && toDo.trim() !=0){
			addTodo(toDo, id, false, false);

			LIST.push({
				name : toDo,
				id : id,
				done : false,
				trash : false
			});

			//add item to localstorage (this code must be added where the LIST array is updated)
			localStorage.setItem("TODO", JSON.stringify(LIST));
			
			id++;
		}
		input.value = "";
    
    let getnumTask = LIST.filter((falseTrash) => falseTrash.trash === false).length;
    console.log(getnumTask);
    pendingTasks.textContent = getnumTask;
}

//complete to do
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
	
	LIST[element.id].done = LIST[element.id].done ? false : true;

}

//remove a to-do
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);
	
	LIST[element.id].trash = true;

  let getnumTask = LIST.filter((falseTrash) => falseTrash.trash === false).length;
    // console.log(getnumTask);
    pendingTasks.textContent = getnumTask;
}

//target the items/element created dynamically
list.addEventListener("click", function(event){
	let element = event.target; // return the clicked element inside list
	const elementJob = element.attributes.job.value; //delete or complete
	
	if(elementJob == "complete"){
		completeToDo(element);
	}else if(elementJob == "delete"){
		removeToDo(element);
	}	
	//add item to localstorage (this code must be added where the LIST array is updated)
	localStorage.setItem("TODO", JSON.stringify(LIST));

});
// Get the total pending tasks
// pendingTasks.textContent = LIST.length;  //passing the array length in pendingtask
// Get the total pending tasks using filter
  // const getnumTask = LIST.filter((falseTrash) => falseTrash.trash === false).length;
  // pendingTasks.textContent = getnumTask;
// const getnumTask = LIST.filter((falseTrash) => falseTrash.trash === false).length;
let getnumTask = LIST.filter((falseTrash) => falseTrash.trash === false).length;
pendingTasks.textContent = getnumTask;
//  console.log(getnumTask);