import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent] // It's a standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a search term when user types in the input', (done) => {
    const searchTerm = 'test search';
    spyOn(component.search, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = searchTerm;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // The component likely debounces the input, so we wait a bit
    setTimeout(() => {
      expect(component.search.emit).toHaveBeenCalledWith(searchTerm);
      done();
    }, 350); // A bit more than the debounce time
  });
});
