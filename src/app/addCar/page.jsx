"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddCar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin"); // redirect if not signed in
        }
    }, [status, router]);

    if (!session) return <p className="text-center mt-40">Redirecting to Sign In...</p>;



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const carData = Object.fromEntries(formData.entries());

        carData.bookingCount = 0;
        carData.postedDate = new Date().toISOString();
        carData.bookingStatus = "not_booked";

        try {
            const res = await fetch("/api/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(carData),
            });

            const data = await res.json();

            if (data.insertedId) {
                toast.success("Car added successfully!");
                form.reset();
            } else {
                toast.error("Failed to add car");
            }
        } catch (error) {
            toast.error("Error adding car");
            console.error(error);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="mt-40 px-4 lg:px-10 my-20">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 p-6 rounded shadow-md max-w-xl mx-auto border border-white"
                >
                    <div>
                        <label className="block mb-1 font-medium">Car Model</label>
                        <input type="text" name="carModel" className="w-full input input-bordered" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Daily Rental Price ($)</label>
                        <input type="number" name="rentalPrice" className="w-full input input-bordered" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Availability</label>
                        <select name="availability" className="w-full select select-bordered" required>
                            <option value="">Select availability</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Vehicle Registration Number</label>
                        <input type="text" name="registrationNumber" className="w-full input input-bordered" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Features</label>
                        <input type="text" name="features" placeholder="GPS, AC, Bluetooth..." className="w-full input input-bordered" />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea name="description" rows="4" className="w-full input input-border" required></textarea>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Booking Count</label>
                        <input type="number" name="bookingCount" className="w-full input input-bordered" defaultValue={0} readOnly />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Image URL</label>
                        <input type="url" name="imageUrl" className="w-full input input-bordered" required />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Location</label>
                        <input type="text" name="location" className="w-full input input-bordered" required />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary w-full">Add Car</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCar;
