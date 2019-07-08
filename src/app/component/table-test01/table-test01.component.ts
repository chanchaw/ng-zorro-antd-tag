import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

export class RowModel{
  public data:string;
}

export class EditModel{
  public isEdit:boolean;
  public data:string;
}

@Component({
  selector: 'app-table-test01',
  templateUrl: './table-test01.component.html',
  styleUrls: ['./table-test01.component.css']
})
export class TableTest01Component implements OnInit {


  @Input() colCaption:string="未命名";
  @ViewChild('editor') editor: ElementRef;

  private tableData:RowModel[] = [];
  private oriData:RowModel[] = [];
  private editCache:EditModel[] = [];
  private search:string;
  private newData:string="";
  


  constructor() { }

  ngOnInit() {
    this.initData();
    this.buildEditCache();
  }

  initData(){
    this.tableData.push({data:'中国'});
    this.tableData.push({data:'美国'});
    this.tableData.push({data:'日本'});
    this.tableData.push({data:'英国'});
    this.tableData.push({data:'法国'});
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
      m.data=element.data;
      this.editCache.push(m);

      this.oriData.push(m);
    });
    console.log(this.editCache);
  }


  startEdit(index:number){
    this.editCache[index].isEdit=true;

    setTimeout(() => {
      this.editor.nativeElement.focus();
    }, 10);
  }

  saveEdit(index:number){
    this.tableData[index].data = this.editCache[index].data;
    this.editCache[index].isEdit=false;
  }

  cancelEdit(index:number){
    this.editCache[index].isEdit=false;
  }

  onEscape(e,index:number){
    this.cancelEdit(index);
  }

  onSearchChange(){
    console.log(this.search);
    if(this.search===undefined || this.search.length<=0){
      this.tableData=this.oriData.filter(val=>true);
    }else{
      this.tableData = this.oriData.filter(val=>val.data.includes(this.search));
    }
  }

  delete(data:string){
    this.oriData = this.oriData.filter(val=>val.data!==data);
    this.tableData = this.oriData.filter(val=>true);
  }

  onAddNew(){
    if(this.newData===undefined || this.newData.length<=0) return;
    this.oriData.push({data:this.newData});
    this.tableData = this.oriData.filter(val=>true);
    this.editCache.push({isEdit:false,data:this.newData});      
    
    this.newData="";
  }
}
