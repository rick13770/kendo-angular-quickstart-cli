import { Component } from '@angular/core';
import { categories } from './data.categories';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
//import { FilterDescriptor } from "@progress/kendo-data-query";
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

const HEROES = [
    {id: 1, name:"<em>Sup</em>erman", "address":  "123 Main Street, North Dakota"},
    {id: 2, name:'<b>Bat</b>man', "address":  "123 Gido Street, North Dakota"},
    {id: 3, name:'BatGirl', "address":  "123 Zerbra Street, North Dakota"},
    {id: 4, name:'Robin', "address":  "123 Exfart Street, North Dakota"},
    {id: 5, name:'Flash', "address":  "123 Windex Street, North Dakota"},
    {id: 6, name:'Dotty', "address":  "123 Elcore Street, North Dakota"},
    {id: 9, name:'Meagan', "address":  "123 Devine Street, North Dakota"},
    {id: 7, name:'IdiotBoy', "address":  "123 Amith Street, North Dakota"},
    {id: 8, name:'Flash', "address":  "456 Main Street, West Dakota"},

];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ProductService]
})

export class AppComponent {
    // used for the DropDownList
    public dropDownItems = categories;
    public defaultItem = { text: 'Filter by Listing', value: null };

    // used for the Grid
    public gridItems!: Observable<GridDataResult>;
    public pageSize: number = 20;
    public skip: number = 0;
    public sortDescriptor: SortDescriptor[] = [];
    public Heroes = HEROES;
    // public filterDescriptor: FilterDescriptor[] = [];
    public filterTerm: number | null = null;
    constructor(private service: ProductService) {
        this.loadGridItems();

    }

  /*  public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadGridItems();
    }
*/
    private loadGridItems(): void {
        this.gridItems = this.service.getProducts(this.skip, this.pageSize, this.sortDescriptor, this.filterTerm);
    }
/*
    public handleSortChange(descriptor: SortDescriptor[]): void {
        this.sortDescriptor = descriptor;
        this.loadGridItems();
    }
*/
    public handleFilterChange(item: { text: string; value: number | null }): void {
        this.filterTerm = item.value;
        this.skip = 0;
        this.loadGridItems();
    }
}
