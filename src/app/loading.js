import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <LoadingSpinner />
        </div>
    );
}
