import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
require('dotenv').config();

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`);

        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()