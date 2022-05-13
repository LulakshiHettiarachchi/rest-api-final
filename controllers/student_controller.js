const conn = require("../services/db");
const AppError = require("../utils/appError");
const { isEmpty } = require("../utils/is_empty");
const Joi =require("@hapi/joi");
const { REGISTER_STUDENT } = require("../queries");
const bcrypt = require("bcryptjs");


const student_model = Joi.object({
    s_id: Joi.string(),
    name: Joi.string().min(3).max(100).required(),
    age: Joi.number().required(),
    rank: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})




exports.get_all_students = ( req,res,next) => {
  
    res.status(200).json({
        data: "Controller connected"
    })

}



//for register student
exports.register_students = ( req,res,next) => {
    if( isEmpty( req.body ) ) return next( new AppError("No Form Data Found!" , 400) );

    const student_data = {
        name: req.body.name,
        age: req.body.age,
        rank: req.body.rank,
        email: req.body.email,
        password: req.body.password
    }

    
    
    try{
        const { error } = student_model.validate( student_data );
        if ( error ) return next(new AppError( error.details[0].message, 400 ));
        
        conn.query( REGISTER_STUDENT , [student_data.email],async ( err, data, feild) =>{
            if( err ) return next( new AppError( err , 500 ) );
            if ( data.length ) return next( new AppError( "Invalid Email or Password. Please Try Again!", 401 ) );
            
            const salt = await bcrypt.genSalt( 10 );
            const hashedValue = await bcrypt.hash( student_data.password, salt );
            
            res.status(200).json({
                salt:salt
            })
        

        }
        );
       
      
    } catch( err ) {
        return next( new AppError(err , 500) );
    }

   /* res.status(200).json({
        name: req.body.name,
        age: req.body.age,
        rank: req.body.rank,
        email: req.body.email,
        password: req.body.password,
        
       
    })*/

}

