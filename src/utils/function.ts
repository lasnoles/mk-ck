export type Callback<T> = (x:T) => void

export function emptyCallback<T> (): Callback<T> {
    return () => undefined;
}

export function ignore(): (...x: any[]) => any {
    return ()=> undefined;
}

export function identity<T>() : (x:T) => T {
    return (x) => x;
}