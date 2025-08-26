// app/api/cars/route.js - for GET all cars & POST new car

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "carDB";

export async function GET() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const cars = await db.collection("cars").find().sort({ postedDate: -1 }).toArray();
        return new Response(JSON.stringify(cars), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch cars" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const carData = await req.json();
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection("cars").insertOne(carData);
        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to add car" }), { status: 500 });
    }
}
