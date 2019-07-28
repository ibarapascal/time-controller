var TimestampService = /** @class */ (function () {
    function TimestampService() {
    }
    // timstamp now in second of 10 digits
    TimestampService.prototype.getTimestampNow = function () {
        return Math.floor(Date.now() / 1000);
    };
    // timstamp at the very start of today in second of 10 digits
    TimestampService.prototype.getTimestampToday = function () {
        var dateNowObj = new Date();
        var month = (dateNowObj.getMonth() + 1).toString(); // months from 1-12
        var day = dateNowObj.getDate().toString();
        var year = dateNowObj.getFullYear().toString();
        var dateTodayString = year + '-' + month + '-' + day;
        var dateTodayObj = new Date(dateTodayString);
        return Math.floor(dateTodayObj.getTime() / 1000);
    };
    // Splice local time to string in seconds
    TimestampService.prototype.showTimeInSeconds = function (htmlElementId, timestamp) {
        var time = timestamp ? new Date(timestamp * 1000) : new Date();
        var h = time.getHours();
        var mtemp = time.getMinutes();
        var stemp = time.getSeconds();
        var m = mtemp < 10 ? '0' + mtemp.toString() : mtemp.toString();
        var s = stemp < 10 ? '0' + stemp.toString() : stemp.toString();
        if (document.getElementById(htmlElementId)) {
            document.getElementById(htmlElementId).innerHTML = h + ':' + m + ':' + s;
        }
    };
    return TimestampService;
}());
export { TimestampService };
//# sourceMappingURL=timestampService.js.map