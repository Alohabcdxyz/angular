import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchNews: string): any[] {
    if (!items) return [];
    if (!searchNews) return items;

    searchNews = searchNews.toLowerCase();

    return items.filter((item) => {
      return item.name.toLowerCase().includes(searchNews); // Change 'name' to the property you want to search
    });
  }
}
