import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  ngOnInit(): void {
    
  }

  searchValue = '';
  filterAddressArray = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' }
  ];
  searchAddress = [];
  sortMap = {
    name   : null,
    age    : null,
    address: null
  };
  sortName = null;
  sortValue = null;
  data = [
    {
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name   : 'Jim Red',
      age    : 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData = [ ...this.data ];

  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }

  search(): void {
    // const filterFunc = (item) => {
    //   return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
    //     (item.name.indexOf(this.searchValue) !== -1);
    // };

    String.prototype['printCC']=function(){
      console.log('chanchaw');
    }

    const filterFunc = (item) => {
      let tt = 123;
      return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
        (item.name.toString().toLowerCase().includes(this.searchValue.toLowerCase()));
    };


    const data = this.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));

    // let theString='中华人民共和国';
    // console.log(theString.includes('lai'));

  }

}
