import { Todo } from "./todo.class";

export class TodoList {

    constructor() {

        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {

        // Esto para devolver una lista excluyendo lo que le pasamos
        // esto es extraño pero para usar el filter
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {

        for (const todo of this.todos ) {
            if (todo.id == id ) {
                todo.completado = true;
                break
            };
        };
        this.guardarLocalStorage();
    };

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todos', JSON.stringify(this.todos));

    }

    cargarLocalStorage() {

        this.todos = (localStorage.getItem('todos'))
            ?  JSON.parse(localStorage.getItem('todos'))
            : [];

        // trasformamos los objetos literales a objetos Todo
        this.todos = this.todos.map( Todo.fromJson);

        }



}
