export const getCookies = key => {
    if (!Boolean(document.cookie)) return 'empty'; // # idiotic way tbh

    return document
        .cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        .split('=')[1];
}