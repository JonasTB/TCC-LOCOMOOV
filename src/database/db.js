const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.Promise = global.Promise;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;