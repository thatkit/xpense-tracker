export const getCookies = key => {
    return document
        .cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        .split('=')[1];
}