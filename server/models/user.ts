import { MongoClient } from 'mongodb';

export const getUsersCollection = (client: MongoClient) => {
    return client.db(process.env.DB_NAME).collection(process.env.DB_USERS_COLLECTION);
};
