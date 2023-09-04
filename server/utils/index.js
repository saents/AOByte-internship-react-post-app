const getDateInfo = () => {
    const dateString = Date.now();
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1 < 10 ? '0' + (dateObject.getMonth() + 1) : dateObject.getMonth();
    const day = dateObject.getDate() < 10 ? '0' + dateObject.getDate() : dateObject.getDate();
    const hour = dateObject.getHours() < 10 ? '0' + dateObject.getHours() : dateObject.getHours();
    const minutes = dateObject.getMinutes() < 10 ? '0' + dateObject.getMinutes() : dateObject.getMinutes();
    const seconds = dateObject.getSeconds() < 10 ? '0' + dateObject.getSeconds() : dateObject.getSeconds();

    return {
        date: day + '/' + month + '/' + year,
        hour: hour + ':' + minutes + ':' + seconds
    };
};

module.exports = {
    getDateInfo
}