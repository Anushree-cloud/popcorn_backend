function success(data:object|null, message:string = "Success", statusCode:number = 200) {
    return (res:any) => res.response({ 
        statusCode,
        message,
        data
    }).code(statusCode)
}

function error(data:object|null, message:string = "Error", statusCode:number = 500) {
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