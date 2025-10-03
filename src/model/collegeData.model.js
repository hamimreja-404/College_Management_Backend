import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    },
    grade: {
        type: String,
    }
}, {
    timestamps: true, 
    collection: 'users'
});

// Middleware to hash the password before saving a new user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.matchRole = async function (role) {
    return role === this.role;    
}
const User = mongoose.model('User', userSchema);

export default User;
