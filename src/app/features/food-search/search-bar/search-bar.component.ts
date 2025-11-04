import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      type="text"
      class="w-full p-2 border border-gray-300 rounded-md"
      placeholder="搜尋產品或品牌..."
      (input)="onSearch($event)"
    />
  `,
})
export class SearchBarComponent implements OnDestroy {
  @Output() search = new EventEmitter<string>();

  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if(term) {
        this.search.emit(term);
      }
    });
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    if(term) {
      this.searchTerms.next(term);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
