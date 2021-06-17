

function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({message: "The user is not authorized"})
    }
    if(err.kind==='ObjectId'){
      return res.status(400).json({message: "Invalid mongodb ID"})

    }

    if(err.name==='ValidationError'){
       const message=Object.values(err.errors).map((val)=>val.message)
        statusCode=400
        return res.status(400).json({statusCode,message: message})
      }
    if(err.code==11000){
        return res.status(400).json({message: "Duplicate input field"})
    }

    // default to 500 server error
    return res.status(500).json(err);
}
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);



module.exports = {errorHandler,asyncHandler};