export class TimestampService {

    // timstamp now in second of 10 digits
    getTimestampNow(): number {
        return Math.floor(Date.now() / 1000);
    }

    // timstamp at the very start of today in second of 10 digits
    getTimestampToday(): number {
        const dateNowObj: Date = new Date();
        const month: string = (dateNowObj.getMonth() + 1).toString(); // months from 1-12
        const day: string = dateNowObj.getDate().toString();
        const year: string = dateNowObj.getFullYear().toString();
        const dateTodayString: string = year + '-' + month + '-' + day;
        const dateTodayObj: Date = new Date(dateTodayString);
        return Math.floor(dateTodayObj.getTime() / 1000);
    }

    // Splice local time to string in seconds
    showTimeInSeconds(htmlElementId: string, timestamp?: number) {
        const time = timestamp ? new Date(timestamp * 1000) : new Date();
        const h = time.getHours();
        const mtemp = time.getMinutes();
        const stemp = time.getSeconds();
        const m = mtemp < 10 ? '0' + mtemp.toString() : mtemp.toString();
        const s = stemp < 10 ? '0' + stemp.toString() : stemp.toString();
        if (document.getElementById(htmlElementId)) {document.getElementById(htmlElementId).innerHTML = h + ':' + m + ':' + s; }
    }

    // Show local date to string in days
    showTimeInDays(htmlElementId: string, timestamp?: number) {
        const time = timestamp ? new Date(timestamp * 1000) : new Date();
        const mtemp = time.getMonth() + 1;
        const dtemp = time.getDate(); // Notice that getDay returns Mon, Tues...
        const m = mtemp < 10 ? '0' + mtemp.toString() : mtemp.toString();
        const d = dtemp < 10 ? '0' + dtemp.toString() : dtemp.toString();
        if (document.getElementById(htmlElementId)) {document.getElementById(htmlElementId).innerHTML = m + '/' + d; }
    }

    // Show local date to string in days
    showTimeInYYYYMMDD(timestamp?: number): string {
        const time = timestamp ? new Date(timestamp * 1000) : new Date();
        const y = time.getFullYear();
        const mtemp = time.getMonth() + 1;
        const dtemp = time.getDate(); // Notice that getDay returns Mon, Tues...
        const m = mtemp < 10 ? '0' + mtemp.toString() : mtemp.toString();
        const d = dtemp < 10 ? '0' + dtemp.toString() : dtemp.toString();
        return y + '-' + m + '-' + d;
    }

}

