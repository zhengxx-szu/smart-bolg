export default function (date) {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minutes = date.getMinutes()
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes
}