export const getCookies = key => {
    if (!Boolean(document.cookie)) return null;

    const cookie = document
        .cookie
        .split('; ')
        .find(row => row.startsWith(`${key}=`))
        .split('=')[1];

    if (cookie.length === 0) return null;

    return cookie;
}