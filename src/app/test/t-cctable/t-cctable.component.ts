import { Component, OnInit } from '@angular/core';
import { RowModel, EditModel } from 'src/app/component/cc-nz-table-single-col/cc-nz-table-single-col.component';


@Component({
  selector: 'app-t-cctable',
  templateUrl: './t-cctable.component.html',
  styleUrls: ['./t-cctable.component.css']
})
export class TCCTableComponent implements OnInit {

  private tableData:RowModel[] = [];
  private newArray:EditModel[] = [];
  private caption:string="动漫人物";

  constructor() { 
    this.initData();
  }

  ngOnInit() {
    
  }

  initData(){
    this.tableData.push({data:'名人'});
    this.tableData.push({data:'六道'});
    this.tableData.push({data:'蝎'});
    this.tableData.push({data:'角都'});
    this.tableData.push({data:'大蛇丸'});
  }

  addNew(e){
    console.log('新增的数据是:' + e);
    console.log('新增后的数组是：');
    console.log(this.tableData);
  }

  update(e){
    console.log('编辑的数据是:' + e.toString());
    console.log('编辑后的数组是：');
    console.log(this.tableData);
  }

  delete(e){
    console.log('删除的数据是:' + e);
    console.log('删除后的数组是：');
    console.log(this.tableData);
  }


  printNewArray(){
    this.newArray = this.newArray.filter(val=>false);

    this.tableData.forEach(element => {
      this.newArray.push({isEdit:false,data:element.data});
    });

    console.log(this.newArray);
  }
}
