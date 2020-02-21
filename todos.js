'use strict';

const e = React.createElement;

const todos = {
    list: [
        { id: 1, text: 'Prepare barbeque' },
        { id: 2, text: 'Hang out washing' },
        { id: 3, text: 'Grocery shopping' }
    ],
    lastIdx: 3
};

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = todos;

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(deleteIdx) {
        this.setState(state => {
            return {
                list: state.list.filter(todo => todo.id != deleteIdx)
            };
        });
    }

    addItem(itemText) {
        this.setState(state => {
            const newIdx = state.lastIdx + 1;
            const newItem = { id: newIdx, text: itemText };

            state.list.push(newItem);
            state.lastIdx = newIdx;

            return state;
        });
    }

    render() {
        return e(
            'ul',
            { className: 'todo-list' },
            this.state.list.map(todo => {
                let itemProps = { ...todo };
                itemProps.key = todo.id;
                itemProps.deleteItem = this.deleteItem;

                return e(TodoItem, itemProps);
            }),
            e(AddTodo, { addItem: this.addItem })
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

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ input: event.target.value });
    }

    render() {
        return e(
            'div',
            { className: 'todo-list__new-item' },
            e('h1', { className: 'todo-list__new-item-header' }, 'Add New Item'),
            e(
                'input',
                {
                    type: 'text',
                    placeholder: 'type new todo here',
                    className: 'todo-list__new-item-input',
                    value: this.state.input,
                    onChange: this.handleChange
                }
            ),
            e(
                'button',
                {
                    className: 'todo-list__new-item-submit',
                    onClick: () => this.props.addItem(this.state.input),
                },
                'Create'
            )
        );
    }
}

const domContainer = ReactDOM.render(
    e(TodoList, { todos: todos }),
    document.querySelector('#todos-container')
);
