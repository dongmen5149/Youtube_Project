const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
                // Store hash in your password DB.
            });
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 123456789 암호화된 비밀번호 $2b$10$h35A4Rbo6TGr.DWMS9toEu6//QvNKTZuqGFQrjR6fQRr0fMq9xrF.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err),
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    //jsonwebtoken을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }