const { connectToDatabase } = require('../util/mongodb.js');

async function testConnection() {
    try {
        const { client, db } = await connectToDatabase();
        console.log('Connected to MongoDB');
        // You can perform additional testing here if needed
        client.close();
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

testConnection();
