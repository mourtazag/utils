
export function debounce(func, wait, immediate) {

    let timeout = void 0;

    return function () {

        const context = this;
        const args = arguments;

        const later = function() {

            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);

        if (callNow) func.apply(context, args);
    };
}

export function throttle(func, wait, options) {
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;

    if (!options) options = {};

    const later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    return function () {
        const now = Date.now();

        if (!previous && options.leading === false) previous = now;

        let remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            previous = now;
            result = func.apply(context, args);

            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

export function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function loadImg(imgSrc) {

    return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = imgSrc;

        img.onload = function () {
            resolve(img);
        };

        img.onerror = function () {
            reject();
        };
    });

}

export function isIE() {
    return document.documentMode;
}

export function emptyElement(node) {
    
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
    
}
