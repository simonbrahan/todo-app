'use strict';

const e = React.createElement;

const todos = [
    { id: 1, text: 'Prepare barbeque' },
    { id: 2, text: 'Hang out washing' },
    { id: 3, text: 'Grocery shopping' }
];

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: props.todos };
    }

    render() {
        return e(
            'ul',
            { className: 'todo-list' },
            this.state.todos.map(todo => {
                let itemProps = { ...todo };
                itemProps.key = todo.id;

                return e(TodoItem, itemProps);
            })
        );
    }
}

class TodoItem extends React.Component {
    render() {
        return e('li', { className: 'todo-list-item' }, this.props.text, e(TodoItemDeleteButton, { id: this.props.id }));
    }
}

class TodoItemDeleteButton extends React.Component {
    render() {
        return e('button', { className: 'todo-list-item__delete' } , 'Delete');
    }
}

const domContainer = ReactDOM.render(e(TodoList, { todos: todos }), document.querySelector('#todos-container'));
