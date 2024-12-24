class Book {
  constructor(
    private title: string,
    private author: string,
    private pages: string[]
  ) {}

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getCurrentPage(pageNumber: number): string {
    return this.pages[pageNumber];
  }
}

class PageNavigation {
  constructor(private currentPageNumber: number = 0) {}

  turnPage(): void {
    this.currentPageNumber++;
  }

  getCurrentPageNumber(): number {
    return this.currentPageNumber;
  }
}

class BookLocation {
  constructor(private shelf: number, private room: number) {}

  getLocation(): string {
    return `Shelf: ${this.shelf}, Room: ${this.room}`;
  }
}

class BookSaver {
  static save(book: Book): void {
    const filename = `/documents/${book.getTitle()} - ${book.getAuthor()}.txt`;
    console.log(`Saving book to ${filename}`);
  }
}

class Printer {
  printPage(page: string): void {}
}

class PlainTextPrinter extends Printer {
  printPage(page: string): void {
    console.log(page);
  }
}

class HtmlPrinter extends Printer {
  printPage(page: string): void {
    console.log(`<div style="single-page">${page}</div>`);
  }
}
