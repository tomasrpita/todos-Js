import { Todo } from '../classes/todo.class';
import { todoList } from '../index';

// Selectores Html
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {

	const htmlTodo = `
		<li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>
	`
	const div = document.createElement('div');
	div.innerHTML = htmlTodo;

	divTodoList.append(div.firstElementChild);

	return div.firstElementChild;

};

// Eventos
txtInput.addEventListener('keyup', (event) => {


	if (event.keyCode === 13 && txtInput.value.length > 0) {

		// event.srcElement.value tambien tiene lo que se ha escrito
		const nuevoTodo = new Todo(txtInput.value);
		crearTodoHtml(nuevoTodo);
		todoList.nuevoTodo( nuevoTodo)
		txtInput.value = '';
 	}
});

divTodoList.addEventListener('click', (event) => {

	const nombreElemento = event.target.localName // input, label, button
	const todoElemento 	 = event.target.parentElement.parentElement; // el li que me contiene
	const todoId		 = todoElemento.getAttribute('data-id');

	if (nombreElemento.includes('input')) {
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed'); // REmover o adiccionar clase
	} else if (nombreElemento.includes('button')) {
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild( todoElemento);
	}

});


btnClearCompleted.addEventListener('click', () => {
	// podriamos primero comprobar que existan elementos en la lista

	todoList.eliminarCompletados();

	// aqui borramos desde el final de la lista hasta el principio
	// porque si comenzamos por el principio podemos cambiar el orden para
	// borrar los demas
	for (let i = divTodoList.children.length -1; i >= 0; i--) {
		const el = divTodoList.children[i];
		if (el.classList.contains('completed')) {
			divTodoList.removeChild(el);
		}

	}

})

ulFilters.addEventListener('click', (event) => {
	const filtro = event.target.text;
	if(!filtro){return;};

	anchorFiltros.forEach(elem => elem.classList.remove('selected'));
	event.target.classList.remove('selected');


	for(const elemento of divTodoList.children) {

		elemento.classList.remove('hidden')
		const completado = elemento.classList.contains('completed');

		switch (filtro) {
			case 'Pendientes':
				if ( completado)
					elemento.classList.add('hidden');
				break;
			case 'Completados':
				if ( !completado)
					elemento.classList.add('hidden');
				break;

		}

	}



})
