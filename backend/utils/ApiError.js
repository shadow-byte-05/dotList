class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stacks = '',
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = errors
        this.data = null
        this.success = false

        if(stacks)
        {
            this.stack = stacks
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError}