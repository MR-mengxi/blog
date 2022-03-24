export default function (fn, duration = 100) {
    let timer = null;
    return (...args) => {
        clearInterval(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, duration);
    }
}