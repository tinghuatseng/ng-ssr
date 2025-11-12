import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (submit)="onSearch()">
      <input
        type="text"
        id="search"
        class="w-full p-2 border border-gray-300 rounded-md"
        placeholder="搜尋產品或品牌..."
        formControlName="search"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm font-medium">搜尋</button>
    </form>
  `,
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>(false);

  form = new FormGroup({
    search: new FormControl('')
  });

  onSearch(): void {
    this.search.emit(this.form.get('search')?.value || '');
  }

}
