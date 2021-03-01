export class APIError extends Error {
    constructor(public code: number, public message: string) {
        super();
    }

    toResponse() {
        return {
            code: this.code,
            message: this.message
        };
    }
}

export const toApiError = (err: Error) => {
    if (err instanceof APIError) {
        return err;
    }

    switch (err.name) {
        case ERROR_KEYS.ValidationError:
            return new APIError(422, err.message);
        case ERROR_KEYS.MongoError:
            return new APIError(500, 'Database error.');
        default:
            return new APIError(500, 'Unknown error.');
    }
};

export const ERROR_KEYS = {
    ValidationError: 'ValidationError',
    MongoError: 'MongoError'
}