import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/service/colorService';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss'],
})
export class ColorPickerPage implements OnInit {

  constructor(
    private colorService: ColorService,
    private navParams: NavParams,
    private popCtrl: PopoverController
  ) { }

  // Color setting list now
  currentSetting: {label: string, color: string}[];
  // Color default list
  colorDefaultList: Array<string>;
  // Color selected
  colorSelected: string;

  ngOnInit() {
    // NavParams, catch the props passed by nav
    this.currentSetting = this.navParams.get('setting');
    // Get the default color list from colorService
    this.colorDefaultList = this.colorService.getDefaultColorList();
  }

  onSelectColor(index: number) {
    // Color selected
    this.colorSelected = this.colorDefaultList[index];
    // Define the return parameters
    this.popCtrl.getTop().then(p => p.dismiss(this.colorSelected));
  }
}
