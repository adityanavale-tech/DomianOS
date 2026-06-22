document.addEventListener("DOMContentLoaded", function () {
  dragElement(document.getElementById("welcomewindow"));
  dragElement(document.getElementById("todoappWindow"));
});
// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  if(!element) return;
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
var welcomeScreen = document.querySelector("#welcomewindow");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");
// Safety checks (prevents whole script breaking)

welcomeScreenClose.addEventListener("click", function () {
    welcomeScreen.style.display = "none";
  });

  welcomeScreenOpen.addEventListener("click", function () {
    welcomeScreen.style.display = "block";
  });
//icons + app

var selectedIcon = undefined
var todoappScreen = document.querySelector("#todoappWindow");
var todoappIcon = document.querySelector("#todoappicon");
var todoappClose = document.querySelector("#todoappclose");

function openWindow(element){
  element.style.display = "block";
  welcomeScreen.style.display = "none";
}

function closeWindow(element){
  element.style.display = "none";
}

function selectIcon(element){
  element.classList.add("selected");

  selectedIcon = element
}

function deselectIcon(element){
  element.classList.remove("selected");

  selectedIcon = undefined
}

function handleIconTap(element){
  if(element.classList.contains("selected")){
    deselectIcon(element)
    openWindow(todoappScreen)
  } else {
    selectIcon(element)
  }
}

todoappIcon.addEventListener("click", function () {
  handleIconTap(todoappIcon);
});

todoappClose.addEventListener("click", function () {
  closeWindow(todoappScreen);
});

//app content
var content = [
    {
      title: "Welcome to To-Do",
      content: `
              <p style="top 70px;left: 200px;background-color: rgba(100, 100, 100, 0.5);padding 5px;font: large;">Projects</p>
              <p>
                I hope you get your to do things done
                Idk how to add check boxes - will come soon dw
                </p>
      `
    }
]

function setToDoContent(index){
  var todoContent = document.querySelector("#todoappContent")

  todoContent.innerHTML = content[index].content
}
setToDoContent(0)

function addToSideBar(index){
  var sideBar = document.querySelector("#sideBar");
  var task = content[index];
  var newDiv = document.createElement("div");

  newDiv.innerHTML = `
    <p style="margin: 0px;">
      ${task.title}
    </p>
  `;

  newDiv.addEventListener("click", function(){
    setToDoContent(index);
  });

  sideBar.appendChild(newDiv);
}

for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}