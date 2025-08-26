"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AvailableCarsTableView from "../components/AvailableCarsTableView";
import AvailableCarsGridView from "../components/AvailableCarsGridView";
import LoadingSpinner from "@/components/LoadingSpinner";

const AvailableCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isGridView, setIsGridView] = useState(true);
    const [sortBy, setSortBy] = useState("newest");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch("/api/cars") // fetch all cars
            .then((res) => res.json())
            .then((data) => {
                const availableCars = data.filter(car => car.availability === "Available");
                setCars(availableCars);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Searching
    const filteredCars = cars.filter((car) => {
        const term = searchTerm.toLowerCase();
        return (
            car.carModel?.toLowerCase().includes(term) ||
            car.brand?.toLowerCase().includes(term) ||
            car.location?.toLowerCase().includes(term)
        );
    });

    // Sorting
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortBy === "newest") return new Date(b.postedDate) - new Date(a.postedDate);
        if (sortBy === "oldest") return new Date(a.postedDate) - new Date(b.postedDate);
        if (sortBy === "lowest") return parseFloat(a.rentalPrice) - parseFloat(b.rentalPrice);
        if (sortBy === "highest") return parseFloat(b.rentalPrice) - parseFloat(a.rentalPrice);
        return 0;
    });

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner />
            </div>
        );

    return (
        <div className="max-w-[1920px] min-h-screen mx-auto px-4 lg:px-10 my-20 mt-40">
            <h1 className="text-center text-4xl font-bold mb-10">Available Cars</h1>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by model, brand, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full lg:max-w-sm border-gray-200"
                />

                <div className="flex gap-4">
                    <select
                        className="select select-bordered border-gray-200"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                    </select>

                    <button
                        onClick={() => setIsGridView(!isGridView)}
                        className="btn btn-outline btn-primary"
                    >
                        {isGridView ? "List View" : "Grid View"}
                    </button>
                </div>
            </div>

            {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {sortedCars.map((car) => (
                        <AvailableCarsGridView key={car._id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto w-full rounded-md border border-gray-200">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Model</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCars.map((car) => (
                                <AvailableCarsTableView key={car._id} car={car} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AvailableCars;
