// Get modal element
var modal = document.getElementById('simpleModal');
// Get open modal button
var clearBtn = document.getElementById('clearBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Button Yes or No
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// // Listen for open click
// clearBtn.addEventListener('click', openModal);
// // Listen for close click
// closeBtn.addEventListener('click', closeModal);
// // Listen for Outside click
// window.addEventListener('click', clickOutside);

// Listen for yes button clicked
// yesBtn.addEventListener('click', clearTodo);
// noBtn.addEventListener('click', closeModal);

//get item from localstorage
//let data = localStorage.getItem("TODO");

// function to open modal
export function openModal() {
  if (!localStorage.getItem('TODO')) return;
  modal.style.display = 'block';
}
// function to close modal
export function closeModal() {
  modal.style.display = 'none';
}

// function to close modal if click outside
export function clickOutside(e) {
  if(e.target == modal){
    modal.style.display = 'none';
  }
}

// function to clear todo
//clear the local storage
export function clearTodo() {
  localStorage.clear();
  modal.style.display = 'none';
  location.reload();
}