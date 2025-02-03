import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchTextChanged = new EventEmitter<string>();

  onSearchTextChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.searchTextChanged.emit(input.value); 
    }
  }
}
