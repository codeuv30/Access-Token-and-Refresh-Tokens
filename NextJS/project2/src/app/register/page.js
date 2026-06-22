import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full border rounded-lg px-3 py-2 bg-background"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;