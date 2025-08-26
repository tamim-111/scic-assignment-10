"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Toaster, toast } from "react-hot-toast";

const SignInPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            ...form,
        });

        setLoading(false);

        if (!result.error) {
            toast.success("Logged in successfully!");
            router.push("/"); // redirect to home after login
        } else {
            toast.error("Sign in failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <Toaster position="top-right" /> {/* Hot toast container */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
                >
                    <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        className="input input-bordered w-full mb-4"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="input input-bordered w-full mb-4"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        className="input input-bordered w-full mb-4"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="input input-bordered w-full mb-6"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        className="btn btn-primary w-full"
                        type="submit"
                        disabled={loading} // disable button while loading
                    >
                        Sign In
                    </button>
                </form>
            )}
        </div>
    );
};

export default SignInPage;
