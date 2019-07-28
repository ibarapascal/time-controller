import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ColorService } from 'src/app/service/colorService';
import { NavParams, PopoverController } from '@ionic/angular';
var ColorPickerPage = /** @class */ (function () {
    function ColorPickerPage(colorService, navParams, popCtrl) {
        this.colorService = colorService;
        this.navParams = navParams;
        this.popCtrl = popCtrl;
    }
    ColorPickerPage.prototype.ngOnInit = function () {
        // NavParams, catch the props passed by nav
        this.currentSetting = this.navParams.get('setting');
        // Get the default color list from colorService
        this.colorDefaultList = this.colorService.getDefaultColorList();
    };
    ColorPickerPage.prototype.onSelectColor = function (index) {
        var _this = this;
        // Color selected
        this.colorSelected = this.colorDefaultList[index];
        // Define the return parameters
        this.popCtrl.getTop().then(function (p) { return p.dismiss(_this.colorSelected); });
    };
    ColorPickerPage = tslib_1.__decorate([
        Component({
            selector: 'app-color-picker',
            templateUrl: './color-picker.page.html',
            styleUrls: ['./color-picker.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ColorService,
            NavParams,
            PopoverController])
    ], ColorPickerPage);
    return ColorPickerPage;
}());
export { ColorPickerPage };
//# sourceMappingURL=color-picker.page.js.map