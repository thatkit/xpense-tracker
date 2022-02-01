export const getCookies = key => {
    if (!Boolean(document.cookie)) return null;

    return document
        .cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        .split('=')[1];
}