'use strict';

const mongoose          =   require('mongoose'),
    path                =   require('path'),
    _moment             =   require(path.resolve(`./app/config/libs/date`)),
    config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    schema              =   mongoose.Schema;

    var otpSchema = new schema({
        email: String,
        otp:    String,
        action : {type:String, default:"EmailVerification"},
        validity:{type:Number, default:_moment.futureDate(new Date(),"x",120,"m")},
        status : {
            type : Boolean,
            default : false
        }
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'         
        }
    });

    otpSchema.statics.setNull = function(obj){
        this.update({
            email : obj.email
        },{
            $set : {
                action : null,
                otp : null,
                validity : null
            }
        }, (err, result) => {
            // OTP state for provided email has been set to NULL
        });
    }

    module.exports = mongoose.model('otp', otpSchema);