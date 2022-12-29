
export default function (initialState: InitialStateType) {
    return {
        canAdmin: initialState?.role === 'admin'
    };
}