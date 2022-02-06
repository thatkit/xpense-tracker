export const convertDate = date => {
    console.log('1', date);
    const convertedDate = new Date(date);
    const newDate = convertedDate.toLocaleString('en-GB', { timeZone: 'UTC' });
    console.log(newDate);
    return newDate;
}