export class AsyncActionState {
    readonly inProgress: boolean = AsyncActionState.initialState.inProgress;
    readonly error: any = AsyncActionState.initialState.error;
    readonly success: boolean = AsyncActionState.initialState.success;

    static initialState: AsyncActionState = {
        inProgress: false,
        error: null,
        success: false,
    };

    static inProgressState: AsyncActionState = {
        inProgress: true,
        error: null,
        success: false,
    };

    static successState = {
        inProgress: false,
        error: null,
        success: true,
    };

    static errorState = (error: any) => ({
        inProgress: false,
        error,
        success: false,
    })
}
