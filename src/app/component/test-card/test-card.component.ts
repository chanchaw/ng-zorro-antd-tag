import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ccTag } from '../cc-nz-tag/cc-nz-tag.component';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css']
})
export class TestCardComponent implements OnInit,OnChanges,DoCheck,
  AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked {
    
  ngAfterViewChecked(): void {
    console.log('子组件ngAfterViewChecked');
    
  }
  ngAfterViewInit(): void {
    console.log('子组件ngAfterViewInit');
  }
  ngAfterContentChecked(): void {
    console.log('子组件ngAfterContentChecked');
  }
  ngAfterContentInit(): void {
    console.log('子组件ngAfterContentInit');
  }
  ngDoCheck(): void {
    console.log('子组件ngDoCheck');
  }

  private js:ccTag[] = [];
  private jh:ccTag[] = [];
  private bz:ccTag[] = [];

  constructor() { 
    console.log('子组件constructor');
  }

  ngOnInit() {
    console.log('子组件ngOnInit');
    this.initData();
  }

  ngOnChanges(){
    console.log('子组件ngOnChanges');
  }

  initData(){
    var js1 = new ccTag();
    js1.text="预付30%";js1.value="预付30%";js1.visible=true;
    this.js.push(js1);

    var js2 = new ccTag();
    js2.text="无预付，开票付清";js2.value="无预付，开票付清";js2.visible=true;
    this.js.push(js2);

    var js3 = new ccTag();
    js3.text="抵账";js3.value="抵账";js3.visible=true;
    this.js.push(js3);


    var jh1 = new ccTag();
    jh1.text="凯鑫送货";jh1.value="凯鑫送货";jh1.visible=true;
    this.jh.push(jh1);

    var jh2 = new ccTag();
    jh2.text="客户自提";jh2.value="客户自提";jh2.visible=true;
    this.jh.push(jh2);

    var jh3 = new ccTag();
    jh3.text="船运";jh3.value="船运";jh3.visible=true;
    this.jh.push(jh3);



    var bz1 = new ccTag();
    bz1.text="单袋";bz1.value="单袋";bz1.visible=true;
    this.bz.push(bz1);

    var bz2 = new ccTag();
    bz2.text="双袋";bz2.value="双袋";bz2.visible=true;
    this.bz.push(bz2);

    var bz3 = new ccTag();
    bz3.text="编织袋";bz3.value="编织袋";bz3.visible=true;
    this.bz.push(bz3);


  }


  addNewTag(e){
    console.log(e);
  }

  updateTag(e){
    console.log(e);
  }
}
