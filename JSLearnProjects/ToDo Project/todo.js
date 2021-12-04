const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardbody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

eventListeners();
console.log(todoInput.value);
function eventListeners() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAddTodosToUI);
    secondCardbody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    //arayüzden todo'ları temizleme
    //todoList.innerHTML="";//çalışır ama yavaş çalışır.
    const todolist=document.querySelectorAll("li.list-group-item");
        if (confirm("Bütün ToDo'lar silinsin mi?")) {
            for (let i = 0; i < todolist.length; i++) {
            todolist[i].remove();
            }
        }
    //local storagedan temizleme
    localStorage.removeItem("todos");
}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
    const text=listItem.textContent.toLocaleLowerCase();
    if(text.indexOf(filterValue)=== -1){//aranan değeri bulamadığı durum
        listItem.setAttribute("style","display: none !important");//important d-flexin block özelliğini ezmek için
    }
    else{
        listItem.setAttribute("style","display: block");
    }
    });
}
function deleteTodo(e){
    if (e.target.className==="fa fa-remove") {
        //e.path[2].remove(); silmek için 2. yöntem.
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStarage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi."); 
    }
}
function deleteTodoFromStarage(deletetodo){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo===deletetodo) {
            todos.splice(index,1); //arrayden değeri siler.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAddTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    let todos=getTodosFromStorage();
    const newTodo=todoInput.value.trim();
    let isThere=false;
    todos.forEach(function(item){
        if (item.indexOf(newTodo)!=-1) {isThere=true}      
    });
    if (newTodo==="") {
        showAlert("danger","Lütfen bir todo girin..");
    }
    else if(isThere){
        showAlert("danger",`${newTodo} listede mevcut.`);
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success",`${newTodo} başarıyla oluşturuldu.`);
    }
    e.preventDefault();
}
function getTodosFromStorage(){//storagedan todoları alma
    let todos;
    if (localStorage.getItem("todos")===null) {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));


}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    //setTimeout
    setTimeout(function(){
alert.remove();
    },1000)

}
function addTodoToUI(newTodo){
    const listItem=document.createElement("li");
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //todo liste ekleme
    todoList.appendChild(listItem);
    todoInput.value="";
}
