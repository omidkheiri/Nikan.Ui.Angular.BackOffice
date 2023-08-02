import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { empty, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css'],
})
export class TranslationsComponent implements OnInit, OnChanges {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  @Input() translation: any;
  @Input() form: any;
  translateItem: any;
  items: { key: string; value: string }[] = [{ key: '', value: '' }];
  components: any;
  KeyList: any;
  constructor(private httpClient: HttpClient) {}
  ngOnChanges(changes: SimpleChanges) {
    this.translateItem = this.translation;
    this.KeyList = [];
    this.items = [{ key: '', value: '' }];
    try {
      this.components = JSON.parse(
        this.form.formTemplateVersions[0].template
      ).components;

      this.KeyList = this.components.map((data: any) => {
        return data.label;
      });
      this.KeyList.push(
        ...this.components.map((data: any) => {
          return data.errorLabel;
        })
      );

      this.KeyList = this.KeyList.filter((data: any) => {
        return data;
      });

      this.KeyList.forEach((data: any) => {
        var i = { key: data, value: '' };
        var currentValue: any = {};
        try {
          currentValue = JSON.parse(
            this.translation.translation.replace(/'/g, '"')
          );

          var hasItem = currentValue[data];

          if (hasItem) {
            i.value = hasItem;
          }
        } catch (error) {}

        this.items.push(i);
      });

      this.items = this.items.filter((data: any) => {
        return data.key != '';
      });
    } catch (error) {}
  }
  selectionChanged(data: any) {
    var translate = this.dataGrid.instance.getDataSource();

    var it = translate.items();
    let updatedTranslation: string = '{';
    var j = 0;
    it.forEach((data) => {
      j++;
      updatedTranslation =
        updatedTranslation + "'" + data.key + "':'" + data.value + "'";

      if (it.length > j) {
        updatedTranslation = updatedTranslation + ',';
      }
    });

    updatedTranslation = updatedTranslation + '}';
    updatedTranslation = updatedTranslation.replace(/undefined/g, '');

    if (!this.translateItem) {
      this.httpClient
        .post(
          `${environment.ApiAddress}/V1/Api/FormTemplateTranslation/Template/${this.form.id}`,
          {
            lang: this.translateItem.lang,
            translation: updatedTranslation,
            langLabel: this.translateItem.langLabel,
          }
        )
        .subscribe();
    } else {
      this.httpClient
        .put(
          `${environment.ApiAddress}/FormTemplateTranslation/Template/${this.form.id}/Translation/${this.translation.id}`,

          {
            lang: this.translateItem.lang,
            translation: updatedTranslation,
            langLabel: this.translateItem.langLabel,
          }
        )
        .subscribe();
    }
  }
  ngOnInit(): void {}
}
