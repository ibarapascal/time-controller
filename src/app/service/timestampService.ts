export class TimestampService {

    // timstamp now in second of 10 digits
    getTimestampNow(): number {
        return Math.floor(Date.now() / 1000);
    }

    // timstamp at the very start of today in second of 10 digits
    getTimestampToday(): number {
        const dateNowObj: Date = new Date();
        const month: string = (dateNowObj.getUTCMonth() + 1).toString(); // months from 1-12
        const day: string = dateNowObj.getUTCDate().toString();
        const year: string = dateNowObj.getUTCFullYear().toString();
        const dateTodayString: string = year + '-' + month + '-' + day;
        const dateTodayObj: Date = new Date(dateTodayString);
        return Math.floor(dateTodayObj.getTime() / 1000);
    }

    showTimeInSeconds(htmlElementId: string) {
        const timeToday = new Date();
        const h = timeToday.getHours();
        const mtemp = timeToday.getMinutes();
        const stemp = timeToday.getSeconds();
        const m = mtemp < 10 ? '0' + mtemp.toString() : mtemp.toString();
        const s = stemp < 10 ? '0' + stemp.toString() : stemp.toString();
        document.getElementById(htmlElementId).innerHTML = h + ':' + m + ':' + s;
    }

}

