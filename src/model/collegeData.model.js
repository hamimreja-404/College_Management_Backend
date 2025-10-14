// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs'; 
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true, 
//         lowercase: true,
//         trim: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         required: true,
//         enum: ['super_admin', 'admin', 'student'], 
//     },
//     collegeName: {
//         type: String,
//     },
//     grade: {
//         type: String,
//     }
// }, {
//     timestamps: true, 
//     collection: 'users'
// });

// // Middleware to hash the password before saving a new user
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Method to compare entered password with the hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
// userSchema.methods.matchRole = async function (role) {
//     return role === this.role;    
// }
// const User = mongoose.model('User', userSchema);

// export default User;


import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    // --- Existing Fields ---
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
    
    // --- New Fields to Match Frontend ---
    email: {
        type: String,
        // While not strictly required for login, it's good practice for uniqueness
        unique: true,
        lowercase: true,
        trim: true,
        // Sparse index allows multiple documents to have a null/missing email
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
        default: 'Active', // New users are active by default
    },
}, {
    timestamps: true,
    collection: 'users'
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
