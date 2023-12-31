export const setCookie = (name: string, value: string, days?: number) => {
    let cookieValue = encodeURIComponent(value);

    if (days) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        cookieValue += `; expires=${expirationDate.toUTCString()}`;
    }

    document.cookie = `${name}=${cookieValue}; path=/`;
}

export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
};
