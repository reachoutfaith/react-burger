interface ICookieOptions {
    expires?: number;
    [key: string]: any
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getExpiredDate(sec: number) {
    const date = new Date()
    date.setTime(date.getTime() + sec * 1000)
    return +date.toUTCString()
}

export function setCookie(name: string, value: string, options?: ICookieOptions) {
    options = {
        path: '/',
        ...options
    }

    let exp = options.expires;

    if (typeof exp == 'number' && exp) {
        exp = options.expires = getExpiredDate(exp)
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value)
    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey
        let optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue
        }
    }
    document.cookie = updatedCookie
}


export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

// Transform string into date
export const getDate = (date: string) => {
    const currentDate = new Date();

    if (date.slice(0, 10) === currentDate.toISOString().slice(0, 10)) {
        return `Сегодня, ${date.slice(11, 16)} i-GMT+3`
    } else {
        return `${date.slice(0, 10)}, ${date.slice(11, 16)} i-GMT+3`
    };
};