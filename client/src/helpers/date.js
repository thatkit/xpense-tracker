export const convertDate = date => {
    const convertedDate = new Date(date);
    const newDate = convertedDate.toLocaleString('en-GB', { timeZone: 'UTC' });
    return newDate;
}

// # might be a good idea to retrieve a user's local time as well as prefered currency