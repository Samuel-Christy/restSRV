var database = require('../dbconnect');

class Todos {

    constructor() {
    };


    getAll(callback) {
        return database.query('' +
            'SELECT * FROM todos ORDER BY start DESC',
            callback
        );
    };

    getById(id, callback) {
        return database.query(
            'SELECT * FROM todos WHERE idtodos=?',
            [id],
            callback
        );
    };

    add(Todo, callback) {
        return database.query(
            'INSERT INTO todos(title,start,stop) VALUES (?,?,?);',
            [Todo.title, Todo.start, Todo.stop],
            callback
        );
    };

    update(Todo, callaback) {
        return database.query(
            'UPDATE todos SET title="?", start="?", stop= "?" where idtodos=?',
            [Todo.title, Todo.start, Todo.stop, Todo.id],
            callback
        );
    };

    delete(Todo, callback) {
        return database.query(
            'DELETE FROM todos where idtodos=?',
            [Todo.id],
            callback
        );
    };

}

module.exports = new Todos();