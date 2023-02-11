export function validateSchema(schema){
    return (req, res, next) => {

      const {value, error: err} = schema.validate(req.body, {abortEarly: false})
      
      if(err){
        if(err){
            const errorMessages = err.details.map(err => err.message)
            return res.status(400).send(errorMessages)
        }
      }
      req.body = {...value}
      next()
    }
}