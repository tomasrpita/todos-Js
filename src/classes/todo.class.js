export class Todo {

    static fromJson({id, tarea, completado, creado}) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;

    }

    constructor( tarea ) {

        this.tarea  = tarea;

        this.id         = new Date().getTime(); // formato numerico del tiempo 9048239840231
        this.completado = false;
        this.creado = new Date();


    }

    imprimirClase() {
        console.log(`${this.tarea} - ${this.id}`);

    }
}
