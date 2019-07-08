import { Component, OnInit } from '@angular/core';


export class EditModel{
  public isEdit:boolean;
  public data:string;
}

@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.css']
})
export class TableTestComponent implements OnInit {

  private tableData:string[] = [];
  private editCache:EditModel[] = [];

  constructor() { }

  ngOnInit() {
    this.initData();
    this.buildEditCache();
  }

  initData(){
    this.tableData.push('中国');
    this.tableData.push('美国');
    this.tableData.push('日本');
    this.tableData.push('法国');
    this.tableData.push('英国');

  }


  buildEditCache(): void {
    this.editCache = this.editCache.filter(item=>false);
    
    // for(let i=0;i<this.tableData.length;i++){
    //   this.editCache[i].isEdit = false;
    //   this.editCache[i].data = this.tableData[i];
    // }

    this.tableData.forEach(element => {
      let m = new EditModel();
      m.isEdit=false;
      m.data=element;
      this.editCache.push(m);
    });
    console.log(this.editCache);
  }


  startEdit(index:number){
    this.editCache[index].isEdit=true;
  }

  saveEdit(index:number){
    console.log('index=' + index.toString());
    console.log('表格数据是：' + this.tableData[index]);
    console.log('缓存的编辑数据是：' + this.editCache[index].data);
    this.tableData[index] = this.editCache[index].data;
    console.log('保存后数组中的数据是：' + this.tableData[index]);
    this.editCache[index].isEdit=false;
  }

  cancelEdit(index:number){
    this.editCache[index].isEdit=false;
  }

  updateEle(){
    this.tableData[1] = '美国' + Math.random().toString();
    console.log(this.tableData[1]);
  }
  
}
