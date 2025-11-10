import { Component, EventEmitter, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <input
      type="text"
      class="w-full p-2 border border-gray-300 rounded-md"
      placeholder="搜尋產品或品牌..."
      [formControl]="input"
      (input)="onSearch($event)"
    />
  `,
})
export class SearchBarComponent implements OnDestroy, AfterViewInit {
  @Output() search = new EventEmitter<string>(false);

  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  input = new FormControl('');

  ngAfterViewInit(): void {
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
    this.searchTerms.next(term);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
