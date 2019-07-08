import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

/*
 * 网格数据集直接使用string[]，在前期测试中其值不可修改
 * 这里使用model包裹则可以，后来测试通过后没有回头修改为string[]
 */
export class RowModel{
  public data:string;
  toString():string{
    return this.data;
  }
}

/*
 * 组件初始化时将数据源集合另存为一个副本，
 * 指定行处于编辑状态时，是对于该副本进行编辑
 * 这样编辑的内容可以保存或者取消，相当于有草稿表功能
 */
export class EditModel{
  public isEdit:boolean;
  public data:string;
}

/*
 * 使用本模型记录被修改的行的修改前数据和修改后数据
 */
export class ChangeRecorder{
  public oldValue:string;
  public newValue:string;

  toString():string{
    return '[oldValue = ' + this.oldValue + '],[newValue = ' + this.newValue + ']';
  }
}

/**
 * 使用方法：
 * 1. 父组件调用该组件时候设置列标题属性：[colCaption] = "父组件中的属性"
 * 2. 父组件中将表数据数组传递给属性：[tableData] = "父组件中的数组变量"
 * 3. 声明事件：
 *            (addNew)="addNew($event)"  参数是新增的元素 - 字符串
 *            (delete)="delete($event)"  参数是删除的元素 - 字符串
 *            (update)="update($event)"  参数是修改的元素 - 模型ChangeRecorder的对象
 */
/**
 * 制作时间：2018年12月26日 10:11:54
 * 作者：chanchaw
 * 
 * 本组件使用了ng-zorro-antd中的组件：table、input、popconfirm
 * 
 * 数据结构与追中效果：
 * 本组件适用于基础资料中的只有一个varchar字段的单表
 * 最终显示为3个列：行号、数据列、操作列
 * 组件实现的功能：用户在UI上做的增删改操作都直接影响父组件中的数据源，并且通过事件将变动数据传递给父组件
 *                父组件只要在事件中做后端操作即可。
 *                表格上方的搜索功能是模糊查询
 */

/*
 * 设计思路：
 * 1. 父容器传入数据源，赋值给属性tableData
 * 2. 该组件初始化时将该记录集拷贝到两个副本记录集中：
 *     showData - 作为表格组件的数据源
 *     editCache - 为每个元素追加isEdit属性后作为编辑状态下的记录集
 * 3. 表格组件中的增删改操作：
 *    3.1. 新增：
 *              tableData：使用push,
 *              editCache：使用push,
 *              showData： 在数组tableData上使用filter复制数据（本数组使用push的话UI上不会变动）
 *    3.2 删除：
 *              tableData：使用splice删除一个元素
 *              editCache：使用splice删除
 *              showData： 在数组tableData上使用filter复制数据（理由同上）
 *    3.3 修改：
 *              tableData：通过下标修改value
 *              editCache：用户在UI上直接修改了
 *              showData： 铜鼓哦下表修改value
 * 4. 过滤操作：
 *              在数组tableData上使用filter形成新的数组赋值给showData
 *              原始数组tableData不受影响
 * 5. 与父组件的交互：
 *    5.1. 上面的增删改操作都直接影响了父组件中传递进来的数组
 *    5.2. 每个操作事件最后发射事件给父组件，同时将被操作的数据以参数的形式传递出去
 *          5.2.1. 新增：将新增的字符串传递出去
 *          5.2.2. 删除：将删除的字符串传递出去
 *          5.2.3. 修改：传递出ChangeRecorder的对象，父组件可通过该对象修改后端数据
 */
@Component({
  selector: 'app-cc-nz-table-single-col',
  templateUrl: './cc-nz-table-single-col.component.html',
  styleUrls: ['./cc-nz-table-single-col.component.css']
})
export class CcNzTableSingleColComponent implements OnInit {

  @Input() colCaption:string="未命名";
  @Input() tableData:RowModel[] = [];

  @Output() addNew:EventEmitter<string> = new EventEmitter();// 新增事件
  @Output() delete:EventEmitter<string> = new EventEmitter();// 删除
  @Output() update:EventEmitter<ChangeRecorder> = new EventEmitter();// 修改
  
  @ViewChild('editor') editor: ElementRef;

  
  private showData:RowModel[] = [];
  private editCache:EditModel[] = [];
  private search:string;
  private newData:string="";
  


  constructor() { }

  ngOnInit() {
    this.buildEditCache();
  }

  buildEditCache(): void {
    this.editCache = this.editCache.filter(item=>false);

    this.tableData.forEach(element => {
      let m = new EditModel();
      m.isEdit=false;
      m.data=element.data;
      this.editCache.push(m);
      this.showData.push({data:element.data});
    });
  }


  startEdit(index:number){
    this.editCache[index].isEdit=true;

    setTimeout(() => {
      this.editor.nativeElement.focus();
    }, 10);
  }

  saveEdit(index:number){
    var changeRecord=new ChangeRecorder();
    changeRecord.oldValue = this.showData[index].data;
    changeRecord.newValue = this.editCache[index].data;

    // 直接修改源头数据和显示数据
    this.tableData[index].data = this.editCache[index].data;
    this.showData[index].data = this.editCache[index].data;
    this.editCache[index].isEdit=false;

    this.update.emit(changeRecord);// 发射修改事件
  }

  cancelEdit(index:number){
    this.editCache[index].isEdit=false;
  }

  onEscape(e,index:number){
    this.cancelEdit(index);
  }

  onSearchChange(){
    if(this.search===undefined || this.search.length<=0){
      this.showData=this.tableData.filter(val=>true);
    }else{
      this.showData = this.tableData.filter(val=>val.data.includes(this.search));
    }
  }




  deleteItem(data:string,index:number){
    var theD = new RowModel();
    theD.data = data;

    if(index>-1) {
      // 直接操作源头数据和编辑数据，显示数据通过filter获取新的数组
      var item = this.tableData.splice(index,1);
      this.editCache.splice(index,1);
      this.showData = this.tableData.filter(item=>true);
      
      this.delete.emit(data);// 发射删除事件
    }
  }

  onAddNew(){
    if(this.newData===undefined || this.newData.length<=0) return;

    // 直接操作源头数据和编辑数据，显示数据通过filter获取新数组
    this.tableData.push({data:this.newData});
    this.editCache.push({isEdit:false,data:this.newData});
    this.showData = this.tableData.filter(val=>true);
    
    this.addNew.emit(this.newData);// 发射addNew事件
    this.newData="";

  }


}

