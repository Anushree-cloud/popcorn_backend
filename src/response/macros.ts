function success(data:object, message:string = "Success", statusCode:number = 200) {
    return (res:any) => res.response({ 
        statusCode,
        message,
        data
    }).code(statusCode)
}

function error(data:object, message:string = "Error", statusCode:number = 500) {
    return (res:any) => res.response({ 
        statusCode,
        message,
        data
    }).code(statusCode)
}

export = {
    success,
    error
}