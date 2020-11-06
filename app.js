var form  = document.getElementById('addForm');
var itemList = document.getElementById('items');

document.addEventListener("DOMContentLoaded", loadTodos )

form.addEventListener('submit',addTodo);
itemList.addEventListener('click',removeItem)

function start(data){
    const param = 'todo='+data;
    const req = new XMLHttpRequest()
    req.open('POST','inc/server.php',true);
    req.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    req.onload = function(){
        if(this.status = 200){
            console.log('request send',this.responseText);
            const display = document.getElementById('msg');
            display.className = "alert alert-warning";
            display.innerText = "Todo Saved"
        }
    }
    req.send(param)
}

function addTodo(e){
    e.preventDefault()
        
    // get input value
    var newTodo = document.getElementById('todo');

    // create new li element
    var li = document.createElement('li')
    
    //add class
    li.className = 'draggable';
    li.draggable = true

    
    // add textnode with input value
    li.appendChild(document.createTextNode(newTodo.value))

    // delete button
    var delBtn = document.createElement('button')
    delBtn.className = 'btn btn-danger btn-sm float-right del';
    delBtn.appendChild(document.createTextNode('X'))
    li.appendChild(delBtn)
    start(newTodo.value)
    itemList.appendChild(li)
    newTodo.value = ""
}

function removeItem(e){
    if(e.target.classList.contains('del')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement
            itemList.removeChild(li)
        }
    }
}
// window.onload = function() {
//     loadTodos();
//   };
function loadTodos(){
    const req = new XMLHttpRequest();
    req.open('GET','inc/server.php',true)
    req.onload = function(){
        if(this.status == 200){
            let todos = JSON.parse(this.responseText)
            let output = '';
            todos.forEach(todo=>{
                output += `
                    <li class="draggable" draggable=true>${todo.todo} <button class="btn btn-danger btn-sm float-right del">X</button></li>
                `
            })
            document.getElementById('items').innerHTML = output
        }
    }
    req.send()
}



itemList.addEventListener('dragover',(e)=>{
    e.preventDefault()
    const draggables = document.querySelectorAll('.draggable')

    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart',()=>{
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend',()=>{
            draggable.classList.remove('dragging')
        })
})
    const draggable = document.querySelector('.dragging')
    const afterElement = getDragAfterElement(draggable,e.clientY)
       
       
       if(afterElement == null){
            itemList.appendChild(draggable)
       }else{
           itemList.insertBefore(draggable,afterElement)
       }
    
})

function getDragAfterElement(draggables,y){
    const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging)')]
    

    return draggableElements.reduce((closest,child)=>{
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2
        
       if (offset < 0 && offset > closest.offset) {
           return {offset:offset, element:child}
       }else{
           return closest
       }
    },{offset:Number.NEGATIVE_INFINITY}).element
}