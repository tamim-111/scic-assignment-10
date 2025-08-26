// app/api/availableCars/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("carDB");
        const cars = await db.collection("cars")
            .find({ availability: "Available" })
            .toArray();

        return new Response(JSON.stringify(cars), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch cars" }), {
            status: 500,
        });
    }
}
