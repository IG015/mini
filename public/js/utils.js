function debounce(fn, delay = 1) {
    let previousTimeOut;
    return function (...params) {
        clearTimeout(previousTimeOut)

        previousTimeOut = setTimeout(() => {
            fn(...params)
        }, delay);
    }
}