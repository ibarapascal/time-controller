export class ColorService {

    // Trans RGB to HEX
    rgbToHex(rgb: {r: number, g: number, b: number}): string {
        function componentToHex(value: number) {
            const hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
        return '#' + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
    }

    // Trans HEX to RGB
    hexToRgb(hex: string): {r: number, g: number, b: number} {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Check if a HEX color background need a white font color to display
    checkIfFontColorToWhite(inputHEX: string): boolean {
        const rgb = this.hexToRgb(inputHEX);
        const calResult = Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
        return calResult > 125 ? false : true;
    }

    // Define a default light color list
    getDefaultColorList(): string[] {
        const colorList = [
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
    }
}
