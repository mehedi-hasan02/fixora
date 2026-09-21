import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
};

export default Login;
