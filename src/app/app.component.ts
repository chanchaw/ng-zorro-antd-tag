import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ccTag } from './component/cc-nz-tag/cc-nz-tag.component';
import { ChangeRecorder } from './component/tag-edit/tag-edit.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges,DoCheck,
  AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked{

    constructor(){
      console.log('父组件constructor');  
    }
  ngOnChanges(){
    console.log('父组件ngOnChanges');
  }

  ngAfterViewChecked(): void {
    console.log('父组件ngAfterViewChecked');
  }
    
  ngAfterViewInit(): void {
    console.log('父组件ngAfterViewInit');
  }
  ngAfterContentChecked(): void {
    console.log('父组件ngAfterContentChecked');
  }
  ngAfterContentInit(): void {
    console.log('父组件ngAfterContentInit');
  }
  ngDoCheck(): void {
    console.log('父组件ngDoCheck');
  }

  private packages:ccTag[]=[];

  ngOnInit(): void {
    console.log('父组件ngOnInit');
    // this.initPackages();
  }

  // initPackages(){
  //   var p1 = new ccTag();
  //   p1.text="单袋";p1.value="单袋";p1.visible=true;
  //   this.packages.push(p1);

  //   var p2 = new ccTag();
  //   p2.text="双袋";p2.value="双袋";p2.visible=true;
  //   this.packages.push(p2);

  //   var p3 = new ccTag();
  //   p3.text="编织袋";p3.value="编织袋";p3.visible=true;
  //   this.packages.push(p3);
  // }


  // addNewTag(tagText:string){
  //   console.log(tagText);
  // }

  // deleteTag(tagText:string){
  //   console.log(tagText);
  // }

  // updateTag(record:ChangeRecorder){
  //   console.log(record);
  // }
}
