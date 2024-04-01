
// "use strict";
// localStorage.clear();

// create tasks
function focuss(){
  let txt = document.querySelector(".text");
  txt.focus();
}

function createStorage(){
  window.localStorage.setItem("tasks","");
}

function getFromStorage(param = undefined){
  if(param === undefined)
    return localStorage.getItem("tasks") === ""? null : JSON.parse(localStorage.getItem("tasks"));
  else{
    if(localStorage.getItem("tasks") === "")
      return null;
    else{
      let ind = null ; 
      JSON.parse(localStorage.getItem("tasks")).forEach((t,index) =>{
      t.id === param?ind=index:null;
      });
      return ind;
    }
  }
}
function setInStorage(param){
  if(localStorage.getItem("tasks") === ""){
    let arr =[];
    arr[0] = {
      id : 0,
      text : param,
      checked : false,
    }
    window.localStorage.tasks = JSON.stringify(arr);
    return 0;
  }else{
    let arr = getFromStorage();
    let id = arr.length;
    arr[id] = {
      id : id,
      text : param,
      checked : false,
    }
    window.localStorage.tasks = JSON.stringify(arr);
    return id ;
  }
}
function deleteFromStorage(id){
  let arr = getFromStorage().filter((t) => t.id !== id);
  window.localStorage.tasks = JSON.stringify(arr);
}

function updatePercentage(){
  let arr = getFromStorage();
  // console.log(arr.length);
  let num =0;
  if(arr.length !== 0){
    arr.forEach((t)=>{
      t.checked === true ? num++:null;
    });
    document.querySelector(".helth div").style.width = `${(100*num)/arr.length}%`;
  }else{
    document.querySelector(".helth div").style.width = `0%`;
  }
  // console.log(num);
  // console.log(arr.length);
  // console.log((100*num)/arr.length);
  focuss();
}
function addTask(par,id,checked = false) {
  let div = document.createElement("div");
  let can = document.createElement("i");
  let checks = document.createElement("i");
  checks.classList.add("fa-regular","fa-square");
  checks.addEventListener("click",() => {
    checks.classList.remove("fa-regular","fa-square");
    checks.classList.add("fa-solid" , "fa-square-check");
    checks.parentElement.style.opacity = "0.5";
    let arr = getFromStorage();
    // checked = arr[getFromStorage(+div.id)].checked
    if(!arr[getFromStorage(+div.id)].checked){
      div.remove();
      document.querySelector(".tasks").appendChild(div);
    }
    arr[getFromStorage(+div.id)].checked = true;
    window.localStorage.tasks = JSON.stringify(arr);
    updatePercentage();
    // checked = true;
  });
  if(checked === true){
    checks.classList.remove("fa-regular","fa-square");
    checks.classList.add("fa-solid" , "fa-square-check");
    div.style.opacity = "0.5";
    // console.log(num);
    updatePercentage();
  }
  div.id=id;
  div.classList.add("task");
  can.classList.add("fa-solid","fa-trash-can");
  can.addEventListener("click", () => {
    // console.log(can.parentElement.id);
    deleteFromStorage(+can.parentElement.id);
    can.parentElement.remove();
    updatePercentage();
  });
  div.innerHTML = par;
  div.append(checks,can);
  document.querySelector(".tasks").appendChild(div);
}


// create tasks key in local storage
if(localStorage.getItem("tasks") === null){
  createStorage();
}else if (localStorage.getItem("tasks") !== ""){ // reseve tasks from local storage
  let arr = getFromStorage();
  if(arr !== null )
  arr.forEach(element => {
    addTask(element.text,element.id,element.checked);
  });
}

document.querySelector(".text").addEventListener("keyup",(eve) =>{
  // console.log(eve.keyCode);
  if (eve.keyCode === 13) {
    document.querySelector(".submit").click();
    // console.log("enter");
  }
});

document.querySelector(".submit").addEventListener("click",() => {
  let txt = document.querySelector(".text");
  if(txt.value !== ""){
    let id = setInStorage(txt.value);
    addTask(txt.value,id);
    updatePercentage();
    txt.value = "";
    focuss()
  }
});


window.onload = focuss;