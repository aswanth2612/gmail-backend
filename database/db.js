import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const Connection = () => {
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-torj0un-shard-00-00.qy2bquu.mongodb.net:27017,ac-torj0un-shard-00-01.qy2bquu.mongodb.net:27017,ac-torj0un-shard-00-02.qy2bquu.mongodb.net:27017/?ssl=true&replicaSet=atlas-j6a91x-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.connect(DB_URI);
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(`Error while connecting with database`, error.message);
    }
}


export default Connection;