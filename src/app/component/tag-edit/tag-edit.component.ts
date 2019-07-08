import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {

  private tag01:CcTag = new CcTag();
  private tag02:CcTag = new CcTag();
  private tag03:CcTag = new CcTag();
  private tags:CcTag[] = [];
  private skipClick:boolean = false;
  private changeRecorder:ChangeRecorder;
  
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('inputElementInArray') inputElementInArray: ElementRef;
  

  //#region 系统生命周期钩子
  constructor(
    private msg:NzMessageService
  ) { }

  ngOnInit() {
    this.initTags();
  }
  //#endregion

  //#region 初始化数据
  initTags(){
    this.tag01.text='单袋';
    this.tag01.value='单袋';
    this.tag01.visible=true;

    this.tag02.text='双袋';
    this.tag02.value='双袋';
    this.tag02.visible=true;

    this.tag03.text='编织袋';
    this.tag03.value='编织袋';
    this.tag03.visible=true;

    this.tags.push(this.tag01);
    this.tags.push(this.tag02);
    this.tags.push(this.tag03);
  }
  //#endregion

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
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
  showInputInArray(tag:CcTag){
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

  handleInputConfirmInArray(tag:CcTag){
    // 修改完毕记录newValue
    this.changeRecorder.newValue=tag.text;
    tag.visible=true;
    console.log(this.changeRecorder);
  }

  handleInputConfirm(): void {
    var target:CcTag = new CcTag();
    target.text=this.inputValue;
    target.value=this.inputValue;
    target.visible=true;

    if (this.inputValue && this.tags.indexOf(target) === -1) {
      this.tags.push(target);
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
}


export class CcTag{
  public text:string;
  public value:string;
  public visible:boolean;  
}

export class ChangeRecorder{
  public oldValue:string;
  public newValue:string;
}