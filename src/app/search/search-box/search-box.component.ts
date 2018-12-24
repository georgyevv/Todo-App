import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  public searchQuery: string;

  constructor(private router: Router) {}

  public ngOnInit() {
    this.router.events.subscribe(() => {
      this.searchQuery = undefined;
    });
  }

  public search() {
    if (!this.searchQuery) {
      return;
    }
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }
}
