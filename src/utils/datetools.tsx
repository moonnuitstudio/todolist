export const getYesterdayDate = () => {
    const date = new Date()
    date.setDate(date.getDate() - 1);
    return date
}

export const isDate18orMoreYearsOld = (day:number, month:number, year:number) => {
    return new Date(year+18, month-1, day) <= new Date();
}

export const getTodayFormat = () => {
    const today = new Date();
    
    return today.toLocaleString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export const prepareDateForSever = (_date:string) => {
    const date = new Date(_date);

    const month = `${(date.getMonth() + 1) < 10? '0' : ''}${date.getMonth() + 1}`
    const day = `${date.getDate() < 10? '0' : ''}${date.getDate()}`

    return `${ date.getFullYear() }-${ month }-${ day }`
}

export function prepareDate(date:Date | null) {
    if (date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`
    }

    return ""
}

/**
 * function prepareDateEventInfo(date:Date | null, time:string | undefined) {
    let info = ""

    if (date && !isNaN(date)) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        info = `${year}-${month}-${day}`
    }

    if (time && time != "") {
        const [hour, min] = time.split(':')

        info += ` ${hour}:${min}`
    }

    return info
}
 */