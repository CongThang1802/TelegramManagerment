export function ObjectRequired(value: any, key: string) {
    if (!value[key]) {
        throw new Error(key);
    }
}

export function ObjectRequiredMultiKey(value: any, keys: string[]) {
    for (const k of keys) {
        if (!value[k]) {
            throw new Error(`Required value of field ${k}`);
        }
    }
}
