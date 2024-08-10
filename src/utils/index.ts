export const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};
