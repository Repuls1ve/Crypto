import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  visiblePages: number[] = []
  currentPage = 1

  @Input() showStats: boolean = false
  @Input() totalItems?: number
  @Input() pageItems?: number

  @Input() pagesDisplay = 3
  @Input() totalPages!: number
  @Output() onPageChange = new EventEmitter<number>()

  constructor(public media: MediaObserver) {}

  ngOnInit(): void {
    this.initPages()
  }

  changePage(page: number): void {
    this.currentPage = page > 0 ? page : 1
    this.onPageChange.emit(this.currentPage)
    this.updateDisplayedPages()
  }

  private updateDisplayedPages() {
    const lastVisiblePage = this.visiblePages[this.visiblePages.length - 1]
    const firstVisiblePage = this.visiblePages[0]
    if (this.currentPage > lastVisiblePage || this.currentPage < firstVisiblePage) {
      let newPages = []
      for (let i = this.currentPage; i < (this.currentPage + this.pagesDisplay); i++) {
        if (i <= this.totalPages) {
          newPages.push(i)
      }
    }
      this.visiblePages = newPages
    }
  }

  private initPages() {
    let pages = []
    for (let i = this.currentPage; i < (this.currentPage + this.pagesDisplay); i++) {
      pages.push(i)
    }
    this.visiblePages = pages
  }
}
