import { Component, OnInit,Input, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-cc-nz-tag',
  templateUrl: './cc-nz-tag.component.html',
  styleUrls: ['./cc-nz-tag.component.css']
})
export class CcNzTagComponent implements OnInit {


  @Input() tags:ccTag[] = [];// 父组件传递进来数据用于显示
  @Output() addNew:EventEmitter<string> = new EventEmitter();// 新增事件
  @Output() delete:EventEmitter<string> = new EventEmitter();// 删除
  @Output() update:EventEmitter<ChangeRecorder> = new EventEmitter();// 修改


  private skipClick:boolean = false;
  private changeRecorder:ChangeRecorder;
  
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('inputElementInArray') inputElementInArray: ElementRef;
  

  //#region 系统生命周期钩子
  constructor() { }

  ngOnInit() {
    // this.initTags();
  }
  //#endregion

  //#region 初始化数据
  initTags(){
    var p1 = new ccTag();
    p1.text="单袋";p1.value="单袋";p1.visible=true;
    this.tags.push(p1);

    var p2 = new ccTag();
    p2.text="双袋";p2.value="双袋";p2.visible=true;
    this.tags.push(p2);

    var p3 = new ccTag();
    p3.text="编织袋";p3.value="编织袋";p3.visible=true;
    this.tags.push(p3);
  }
  //#endregion

  handleClose(removedTag: ccTag): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    this.delete.emit(removedTag.text);// 发射删除事件
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  // 数组反应到UI上的input
  showInputInArray(tag:ccTag){
    if(this.skipClick){
      this.skipClick = false;
      return;
    }

    // 显示输入框则记录oldValue
    this.changeRecorder = new ChangeRecorder();
    this.changeRecorder.oldValue=tag.text

    tag.visible=false;
    setTimeout(() => {
      this.inputElementInArray.nativeElement.focus();
    }, 10);
  }

  handleInputConfirmInArray(tag:ccTag){
    // 修改完毕记录newValue
    this.changeRecorder.newValue=tag.text;
    tag.visible=true;
    this.update.emit(this.changeRecorder);// 发送修改事件
  }

  handleInputConfirm(): void {
    var target:ccTag = new ccTag();
    target.text=this.inputValue;
    target.value=this.inputValue;
    target.visible=true;

    if (this.inputValue && this.tags.indexOf(target) === -1) {
      this.tags.push(target);

      this.addNew.emit(target.text);// 发射addNew事件

      this.inputValue='';
      this.showInput();
    }else{
      this.inputValue = '';
      this.inputVisible = false;
    }

  }

  onCloseTagInArray(){
    this.skipClick = true;
  }


  keydownInArray(e){
    console.log(e);
  }

  deleteTag(){
    console.log('正准备删除一个TAG！');
  }

}



export class ccTag{
  public text:string;
  public value:string;
  public visible:boolean;  
}

export class ChangeRecorder{
  public oldValue:string;
  public newValue:string;
}