import { TodosService } from './todos.service';
import { Todo } from './../todo';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('todos')
export class TodosController {
  private readonly logger = new Logger('TodosController');

  constructor(private todosService: TodosService) {}

  @Get()
  getAll(@Req() req: any): Todo[] {
    this.logger.log(req.user.sub);
    return this.todosService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string): Todo {
    const todo = this.todosService.get(+id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  add(@Body() todo: Todo): Todo {
    return this.todosService.add(todo);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Body() todo: Todo, @Param('id') id: string): void {
    this.todosService.update(+id, todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): void {
    this.todosService.delete(+id);
  }
}
