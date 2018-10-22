
export function debounce(func, wait, immediate) {

    let timeout = void 0;

    return function () {

        const context = this;
        const args = arguments;

        const later = function later() {

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
