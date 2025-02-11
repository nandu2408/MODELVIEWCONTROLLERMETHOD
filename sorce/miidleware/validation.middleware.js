import { body, validationResult } from "express-validator";


 const  validatRequest= async (req, res, next)=>{

    const rules=[

        body("name").notEmpty().withMessage("name is required"),

        body("price").isFloat({gt:0}).withMessage(" price should be positive"),

        body("imageurl").custom((value, {req})=>{

            if(!req.file){
              throw new Error("Profile image is required")
            }
            return true
          })
    ];

    await Promise.all(
        rules.map(rule=>rule.run(req))
    )

    var validateErrors = validationResult(req);
   

    if(!validateErrors.isEmpty()){
      res.render("newproduct", {errorMessage:validateErrors.array()[0].msg})
    }
next();

}

export default validatRequest;