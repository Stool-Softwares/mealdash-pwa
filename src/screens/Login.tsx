import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../supabase";
import { Button } from "../ui/Button";
import { Center } from "../ui/Center";
import { Input } from "../ui/Input";
import { VStack } from "../ui/VStack";

interface LoginForm {
  email: string;
  password: string;
}

export function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const navigate = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ form });

    const { data, error } = await supabase.auth.signInWithPassword({
      ...form,
      options: { data: { type: "HOS" } },
    });

    if (data.session?.access_token) {
      navigate("/home");
    } else {
      toast("Unable to login", { type: "error", hideProgressBar: true });
    }
  }

  return (
    <Center className="h-full">
      <div>
        <VStack className="items-center">
          <div className="text-center mb-5">
            <h1 className="text-lg font-bold">MealDash</h1>
            <p>Login</p>
          </div>

          <form onSubmit={onSubmit}>
            <VStack className="gap-3">
              <Input
                className="w-72"
                type="email"
                placeholder="E-Mail"
                value={form.email}
                name="email"
                autoComplete="off"
                onChange={onChange}
              />
              <Input
                className="w-72"
                type="password"
                placeholder="Password"
                value={form.password}
                name="password"
                onChange={onChange}
              />
            </VStack>

            <Button className="w-full mt-5 py-2" type="submit">
              Login
            </Button>
          </form>

          <p className="mt-3">
            New to MealDash?{" "}
            <span
              className="text-blue-500"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </VStack>
      </div>
    </Center>
  );
}
