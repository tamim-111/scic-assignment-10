// app/api/cars/[id]/route.js -- for GET, PATCH, DELETE a specific car

import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "carDB";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        await client.connect();
        const db = client.db(dbName);
        const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
        if (!car) return new Response(JSON.stringify({ error: "Car not found" }), { status: 404 });
        return new Response(JSON.stringify(car), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch car" }), { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        const { id } = params;
        const updateData = await req.json();
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection("cars").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update car" }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection("cars").deleteOne({ _id: new ObjectId(id) });
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete car" }), { status: 500 });
    }
}
