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
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(deleteIdx) {
        this.setState(state => {
            return {
                todos: state.todos.filter(todo => todo.id != deleteIdx)
            };
        });
    }

    render() {
        return e(
            'ul',
            { className: 'todo-list' },
            this.state.todos.map(todo => {
                let itemProps = { ...todo };
                itemProps.key = todo.id;
                itemProps.deleteItem = this.deleteItem;

                return e(TodoItem, itemProps);
            })
        );
    }
}

class TodoItem extends React.Component {
    render() {
        return e(
            'li',
            { className: 'todo-list-item' },
            this.props.text,
            e(
                'button',
                {
                    className: 'todo-list-item__delete',
                    onClick: () => this.props.deleteItem(this.props.id)
                },
                'Delete'
            )
        );
    }
}

const domContainer = ReactDOM.render(
    e(TodoList, { todos: todos }),
    document.querySelector('#todos-container')
);
