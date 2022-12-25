import { useState } from "react";
import supabase from "../supabase";
import { UserType } from "../types";
import { Button } from "../ui/Button";
import { Center } from "../ui/Center";
import { Input } from "../ui/Input";
import { VStack } from "../ui/VStack";
import fp from "lodash";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  email: string;
  password: string;
  name: string;
  type: UserType;
}

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
    type: UserType.STUDENT,
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp(form);
    console.log({ data, error });

    // if (!data.session?.access_token) return;

    // // add the user to DB
    // const formDerivedValues = fp.pick(form, ["name", "type"]);
    // const userId = data.session.user.id;
    // const user = await supabase
    //   .from("Users")
    //   .insert({ userId, ...formDerivedValues });

    // console.log({ user });

    if (!data.session && data.user) {
      navigate("/verify-email");
    }
  }

  return (
    <Center className="h-full">
      <div>
        <VStack className="items-center">
          <div className="text-center mb-5">
            <h1 className="text-lg font-bold">MealDash</h1>
            <p>Register</p>
          </div>

          <form onSubmit={onSubmit}>
            <VStack className="gap-3">
              <Input
                className="w-72"
                type="text"
                placeholder="Name"
                value={form.name}
                name="name"
                onChange={onChange}
              />
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
              <Input
                className="w-72"
                type="text"
                placeholder="Type"
                value={form.type}
                name="type"
                onChange={onChange}
              />
            </VStack>

            <Button className="w-full mt-5 py-2" type="submit">
              Register
            </Button>
          </form>
          <p className="mt-3">
            Already a user?{" "}
            <span className="text-blue-500" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </VStack>
      </div>
    </Center>
  );
}
