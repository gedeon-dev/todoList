import { createElement } from "../function/dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */


export class TodoList{
    
    /** @type {Todo[]} */
    #todos = []

    /** @type {HTMLUListElement} */
    #listElement

    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor (todos){
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo (element){
        element.innerHTML = `<form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>

            <ul class="list-group">
            </ul>
        </main>`
        this.#listElement = element.querySelector('.list-group')
        for (let todo of this.#todos){
            const task = new TodoListItem(todo)
            this.#listElement.append(task.element)
        }
        element.querySelector('form').addEventListener('submit', e => this.onSubmit(e))
    }

    /**
     * 
     * @param {SubmitEvent} e 
     */
    onSubmit (e){
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get('title').toString().trim()
        if(title === ''){
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const task = new TodoListItem(todo)
        this.#listElement.prepend(task.element)
        form.reset()
    }
}

class TodoListItem{

    /** @type {HTMLElement} */
    #element

    /** @type {Todo} */
    constructor (todo){
        const id = `todo-${todo.id}`
        const li = createElement('li',{
            class: 'todo list-group-item d-flex align-items-center'
        })
        const checkbox = createElement('input', {
            class: 'form-check-input" type="checkbox',
            type: "checkbox",
            id,
            checked: todo.completed ? '' : null
        })
        const label = createElement('label',{
            class: 'ms-2 form-check-label',
            for: id
        })
        label.innerText = todo.title
        const button = createElement('button', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = `<i class="bi-trash"></i>`
        li.append(checkbox)
        li.append(label)
        li.append(button)

        button.addEventListener('click', e => this.remove(e))

        this.#element = li
    }

    /**
     * @return {HTMLElement}
     */
    get element (){
        return this.#element
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    remove (e){
        e.preventDefault()
        this.#element.remove()
    }
}