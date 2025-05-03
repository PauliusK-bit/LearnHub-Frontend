import { ChangeEvent, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import "./LoginPage.css";

import { Input } from "@heroui/react";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginInfo = { email, password };
      const { data } = await api.post(`/users/login`, loginInfo);

      const { token } = data;

      if (token) {
        login(token);
        toast.success("Logged in");
        navigate("/profile");
      }
    } catch (error) {
      console.log("Failed to login", error);
    }
  };

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className="form-control">
          <Input
            className="max-w-xs"
            label="Email"
            type="email"
            id="email"
            variant="bordered"
            value={email}
            onChange={userEmailHandler}
          />
        </div>
        <div className="form-control">
          <Input
            className="max-w-xs"
            label="Password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={userPasswordHandler}
          />
        </div>
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
