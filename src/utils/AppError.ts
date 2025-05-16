class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number, stack?: '') {
        super(message);
        this.statusCode = statusCode || 5000;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
