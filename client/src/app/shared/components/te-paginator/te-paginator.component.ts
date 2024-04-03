import { Component, Input, Output, EventEmitter } from '@angular/core';
import { pagination } from '../../interfaces/shared.model';

@Component({
  selector: 'app-te-paginator',
  templateUrl: './te-paginator.component.html',
  styleUrls: ['./te-paginator.component.scss'],
})
export class TePaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 5;
  @Input() totalPages: number = 0;

  @Output() pageChange = new EventEmitter<pagination>();

  ngOnInit() {}

  onPageClick(page: number): void {
    if (
      this.totalPages &&
      this.currentPage >= 0 &&
      this.currentPage != page &&
      this.currentPage <= this.totalPages
    ) {
      const paginationParams = {
        page: page,
        pageSize: this.pageSize,
        totalPages: this.totalPages,
      };
      this.pageChange.emit(paginationParams);
    }
  }

  onFirstPageClick(): void {
    this.onPageClick(1);
  }

  onPrevPageClick(): void {
    const page = this.currentPage - 1;
    this.onPageClick(page);
  }

  onNextPageClick(): void {
    const page = this.currentPage + 1;
    this.onPageClick(page);
  }

  onLastPageClick(): void {
    this.onPageClick(this.totalPages);
  }

  generateVisiblePageArray(): any[] {
    const maxVisiblePages = 6;
    const currentPage = this.currentPage;
    const totalPages = this.totalPages;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const visiblePages: (number | string)[] = [];

    visiblePages.push(1);

    if (currentPage <= 3) {
      for (let page = 2; page <= 4; page++) {
        visiblePages.push(page);
      }
      visiblePages.push('...');
      visiblePages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      visiblePages.push('...');
      for (let page = totalPages - 3; page <= totalPages - 1; page++) {
        visiblePages.push(page);
      }
      visiblePages.push(totalPages);
    } else {
      visiblePages.push('...');
      visiblePages.push(currentPage);
      visiblePages.push(currentPage + 1);
      visiblePages.push('...');
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }
}
