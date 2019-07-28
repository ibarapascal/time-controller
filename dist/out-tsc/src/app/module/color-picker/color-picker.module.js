import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ColorPickerPage } from './color-picker.page';
var routes = [
    {
        path: '',
        component: ColorPickerPage
    }
];
var ColorPickerPageModule = /** @class */ (function () {
    function ColorPickerPageModule() {
    }
    ColorPickerPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ColorPickerPage]
        })
    ], ColorPickerPageModule);
    return ColorPickerPageModule;
}());
export { ColorPickerPageModule };
//# sourceMappingURL=color-picker.module.js.map