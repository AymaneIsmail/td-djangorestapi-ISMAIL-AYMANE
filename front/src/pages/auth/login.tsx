import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth/auth-provider";
import { useRouter } from "@/hooks/useRouter";

export default function Login() {
    const { signIn, isAuthenticated } = useAuth();
    const { push } = useRouter();
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const username = form.get("username") as string;
        const password = form.get("password") as string;

        signIn(username, password);

        if (isAuthenticated) {
            push('/dashboard')
        }
    }

    return (
        <div className="container flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <Link to="/" className="self-start">
                    <ChevronLeftIcon className="mr-2 h-5 w-5 text-gray-600" />
                    Back
                </Link>
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                    />
                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                    />
                    <Button type="submit" className="w-full py-2 text-white bg-slate-950 rounded-md hover:bg-slate-800">
                        Submit
                    </Button>
                </form>
                <p className="text-sm text-gray-500">
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Don't have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}