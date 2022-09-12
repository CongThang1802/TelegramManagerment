export function NotFoundHandler<T>(value: T) {
    if (!value) {
        throw new Error('Not Found');
    }
    return value;
}
