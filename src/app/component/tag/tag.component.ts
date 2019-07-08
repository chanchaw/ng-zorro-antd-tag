import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor(
    private msg:NzMessageService,
    private modalService:NzModalService
  ) { }

  ngOnInit() {
  }

  private tagChecked:boolean = false;

  tags = [ 'Unremovable', 'Tag 2', 'Tag 3' ];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement') inputElement: ElementRef;

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

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags.push(this.inputValue);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
  

  checkChange(e){
    console.log(this.tagChecked);
    this.tagChecked = !this.tagChecked;
    console.log(this.tagChecked);
    this.msg.info('被选中：' + this.tagChecked);
  }

  confirm(i){
    alert('确实要删除了！');
  }

  onClose(){
    alert('您确定要删除么？');
    // this.modalService.create({
    //   nzTitle: '警告',
    //   nzContent: '您确定要删除么？',
    //   nzClosable: false,
    //   nzOnOk: () => new Promise((resolve) => window.setTimeout(resolve, 1000))
    // });

  }
}
