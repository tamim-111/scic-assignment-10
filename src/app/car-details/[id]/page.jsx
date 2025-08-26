"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const CarDetailsPage = ({ params }) => {
    const { id } = params;
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/cars/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCar(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        );

    if (!car) return <p className="text-center mt-40">Car not found.</p>;

    return (
        <main className="max-w-6xl mx-auto px-4 lg:px-12 mt-40 mb-20 border border-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold mb-10 text-center">{car.carModel}</h1>

            <div className="flex flex-col items-center lg:flex-row gap-10 py-10">
                {/* Image */}
                <div className="lg:w-1/2">
                    <img
                        src={car.imageUrl}
                        alt={car.carModel}
                        className="w-full h-auto rounded-lg object-cover max-h-[400px]"
                        loading="lazy"
                    />
                </div>

                {/* Details */}
                <section className="flex flex-col justify-between lg:w-1/2 space-y-6">
                    <div className="space-y-3">
                        <p className="text-lg">
                            <span className="font-semibold">Price per Day:</span> ${car.rentalPrice}
                        </p>

                        <p className="text-lg">
                            <span className="font-semibold">Availability:</span>{" "}
                            <span
                                className={
                                    car.availability === "Available"
                                        ? "text-green-600 font-semibold"
                                        : "text-red-600 font-semibold"
                                }
                            >
                                {car.availability}
                            </span>
                        </p>

                        <p className="text-lg">
                            <span className="font-semibold">Booking Count:</span> {car.bookingCount}
                        </p>

                        <p className="text-lg">
                            <span className="font-semibold">Location:</span> {car.location}
                        </p>

                        <div>
                            <h2 className="font-semibold text-xl mb-1">Description:</h2>
                            <p>{car.description || "No description available."}</p>
                        </div>

                        <div>
                            <h2 className="font-semibold text-xl mb-1">Features:</h2>
                            <p>{car.features || "No features listed."}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default CarDetailsPage;
