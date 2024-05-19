class createError extends Error {
    constructor(message,statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status =`${statusCode}`.startWith('4') ? 'fail' : 'error'

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = createError;