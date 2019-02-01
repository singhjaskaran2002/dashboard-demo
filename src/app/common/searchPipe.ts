import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(data => {
            return data.username.toLowerCase().includes(searchText);
        });
    }
}
