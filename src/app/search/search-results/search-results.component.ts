import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoModel } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  public  searchQuery: string;
  public resultTodos: TodoModel[];

  constructor(private route: ActivatedRoute, public todoService: TodoService) {
    this.resultTodos = [];
  }

  public ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.searchQuery = params.query;

        this.todoService.getTodosListByTitle(this.searchQuery).subscribe(todos => {
          this.resultTodos = todos;
        });
      });
  }

  public completeTodo(todo: TodoModel) {
    todo.isCompleted = true;
    this.todoService.update(todo);
  }
}
