var ColorService = /** @class */ (function () {
    function ColorService() {
    }
    // Trans RGB to HEX
    ColorService.prototype.rgbToHex = function (rgb) {
        function componentToHex(value) {
            var hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
        return '#' + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
    };
    // Trans HEX to RGB
    ColorService.prototype.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    // Check if a HEX color background need a white font color to display
    ColorService.prototype.checkIfFontColorToWhite = function (inputHEX) {
        var rgb = this.hexToRgb(inputHEX);
        var calResult = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
        return calResult > 128 ? false : true;
    };
    // Define a default light color list
    ColorService.prototype.getDefaultColorList = function () {
        var colorList = [
            '#e45a33',
            '#fa761e',
            '#ef486e',
            '#4488ff',
            '#ff44aa',
            '#ffd165',
            '#fde84e',
            '#9ac53e',
            '#05d59e',
            '#5bbfea',
            '#1089b1',
            '#06394a',
        ];
        return colorList;
    };
    return ColorService;
}());
export { ColorService };
//# sourceMappingURL=colorService.js.map