import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                image: { label: "Photo URL", type: "text" },
            },
            async authorize(credentials) {
                // In a real app, you would check a DB here
                if (
                    credentials.email &&
                    credentials.password &&
                    credentials.name
                ) {
                    return {
                        id: "1",
                        name: credentials.name,
                        email: credentials.email,
                        image: credentials.image || "https://i.pravatar.cc/100",
                    };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin", // redirect to custom signin page
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
