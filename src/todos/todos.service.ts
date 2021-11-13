import { Todo } from './../todo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private readonly todos = new Map<number, Todo>();

  getAll(): Todo[] {
    return Array.from(this.todos.values());
  }

  get(id: number): Todo | undefined {
    return this.todos.get(id);
  }

  add(todo: Todo): Todo {
    todo.id = Date.now();
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id: number, todo: Todo) {
    this.todos.set(id, todo);
  }

  delete(id: number) {
    this.todos.delete(id);
  }
}
