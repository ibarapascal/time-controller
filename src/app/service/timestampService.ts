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

}

