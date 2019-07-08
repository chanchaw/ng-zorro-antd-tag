import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { TestCardComponent } from './component/test-card/test-card.component';
import { ListComponent } from './component/list/list.component';
import { TagComponent } from './component/tag/tag.component';
import { TagEditComponent } from './component/tag-edit/tag-edit.component';
import { CcNzTagComponent } from './component/cc-nz-tag/cc-nz-tag.component';
import { TableComponent } from './component/table/table.component';
import { TableTestComponent } from './component/table-test/table-test.component';
import { CcNzTableComponent } from './component/cc-nz-table/cc-nz-table.component';
import { CcNzTableSingleColComponent } from './component/cc-nz-table-single-col/cc-nz-table-single-col.component';
import { TableEditComponent } from './component/table-edit/table-edit.component';
import { TableTest01Component } from './component/table-test01/table-test01.component';
import { TCCTableComponent } from './test/t-cctable/t-cctable.component';
import { AppComponent } from './app.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    TestCardComponent,
    ListComponent,
    TagComponent,
    TagEditComponent,
    CcNzTagComponent,
    TableComponent,
    TableTestComponent,
    CcNzTableComponent,
    CcNzTableSingleColComponent,
    TableEditComponent,
    TableTest01Component,
    TCCTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
