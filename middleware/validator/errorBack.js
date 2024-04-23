const { validationResult } = require('express-validator')

module.exports = validations =>{
  return async (req,res,next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if(result.errors.length) break
    }
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.status(401).json({errors:errors.array()})
      return
    }
    next()
  }
}