import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 


const Connection = () => {
    const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gmailcluster.qy2bquu.mongodb.net/test?retryWrites=true&w=majority&appName=gmailCluster`;
    try {
        mongoose.connect(DB_URI);
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`Error while connecting with database`, error.message);
    }
}


export default Connection;