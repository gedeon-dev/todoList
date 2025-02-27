import { TodoList } from "./components/Todolist.js";
import { fetcJSON } from "./function/api.js";
import { createElement } from "./function/dom.js";

try {
    const todos = await fetcJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist'))
}catch(e){
    const alertElement = createElement('div', {
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    alertElement.innerText = 'Impossible de charger les élements'
    document.body.prepend(alertElement)
}