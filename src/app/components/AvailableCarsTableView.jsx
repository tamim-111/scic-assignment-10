import React from "react";
import Link from "next/link";

const AvailableCarsTableView = ({ car }) => {
    return (
        <tr className="border border-gray-200">
            <td className="p-2">
                <img
                    src={car.imageUrl}
                    alt={car.carModel}
                    className="w-24 h-16 object-cover rounded"
                />
            </td>
            <td className="p-2 font-semibold">{car.carModel}</td>
            <td className="p-2 truncate max-w-xs">
                {car.description ? car.description.substring(0, 60) + "..." : "No description"}
            </td>
            <td className="p-2">
                <Link href={`/car-details/${car._id}`} className="btn btn-sm btn-primary">
                    Book Now
                </Link>
            </td>
        </tr>
    );
};

export default AvailableCarsTableView;
