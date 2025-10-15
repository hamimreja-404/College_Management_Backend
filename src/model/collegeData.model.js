import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['super_admin', 'admin', 'student'],
    },
    collegeName: {
        type: String,
        trim: true,
    },
    grade: {
        type: String,
        trim: true,
    },
    
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        sparse: true, 
    },
    roll: {
        type: String,
        trim: true,
    },
    year: {
        type: String,
        trim: true,
    },
    course: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active', 
    },
}, {
    timestamps: true,
    collection: 'users'
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
