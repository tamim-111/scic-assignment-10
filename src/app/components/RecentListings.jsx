"use client";

import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import RecentListingsCard from "./RecentListingsCard";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "@/components/LoadingSpinner";

const RecentListings = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8); // initially show 8 cars

    useEffect(() => {
        setLoading(true);
        fetch("/api/cars")
            .then((res) => res.json())
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner />;

    const getTimeAgo = (date) => {
        return `Added ${formatDistanceToNow(new Date(date), { addSuffix: true })}`;
    };

    const loadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    const visibleCars = cars.slice(0, visibleCount);

    return (
        <Fade>
            <div className="max-w-[1920px] mx-auto px-4 lg:px-10 my-20">
                <h1 className="text-center text-4xl font-bold mb-10">Recent Listings</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
                    {visibleCars.map((car) => (
                        <RecentListingsCard
                            car={car}
                            getTimeAgo={getTimeAgo}
                            key={car._id}
                        />
                    ))}
                </div>

                {visibleCount < cars.length && (
                    <div className="text-center mt-10">
                        <button
                            onClick={loadMore}
                            className="btn btn-primary btn-md"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </Fade>
    );
};

export default RecentListings;
