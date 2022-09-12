export function repeatValue(time: number, value: string | number): string {
    let result = '';
    for (let i = 0; i < time; i++) {
        result = result.concat(value.toString());
    }
    return result;
}
