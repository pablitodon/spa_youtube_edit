

export const getViewSpaceFunc = (num: string) => {
    if (!num) return `0`;
    const number = parseInt(num, 10);
    return number.toLocaleString('ru-RU');
}