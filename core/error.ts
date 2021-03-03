export class APIError extends Error {
    constructor(public code: number, public message: string) {
        super();
    }

    static toResponse(err: APIError) {
        return {
            code: err.code,
            message: err.message
        };
    }

    static fromError = (err: Error) => {
        if (err instanceof APIError) {
            return err;
        }

        switch (err.name) {
            case ERROR_KEYS.ValidationError:
                return new APIError(409, err.message);
            case ERROR_KEYS.MongoError:
                return new APIError(500, 'Database error.');
            default:
                return new APIError(500, 'Unknown error.');
        }
    };
}

export const ERROR_KEYS = {
    ValidationError: 'ValidationError',
    MongoError: 'MongoError'
};
