export const getYesterdayDate = () => {
    var date = new Date()
    date.setDate(date.getDate() - 1);
    return date
}

export const isDate18orMoreYearsOld = (day, month, year) => {
    return new Date(year+18, month-1, day) <= new Date();
}

export const getTodayFormat = () => {
    var today = new Date();

    var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return today.toLocaleString('en-us', options)
}

export const prepareDateForSever = (_date) => {
    const date = new Date(_date);

    const month = `${(date.getMonth() + 1) < 10? '0' : ''}${date.getMonth() + 1}`
    const day = `${date.getDate() < 10? '0' : ''}${date.getDate()}`

    return `${ date.getFullYear() }-${ month }-${ day }`
}