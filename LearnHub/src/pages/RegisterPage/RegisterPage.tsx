import { ChangeEvent, useState } from "react";
import { API_URL } from "../../config/config";
import axios from "axios";
import { useNavigate } from "react-router";
import "./RegisterPage.css";
import { Input } from "@heroui/react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const userNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userInfo = { username, email, password };
      console.log(username, email, password);
      await axios.post(`${API_URL}/users/register`, userInfo);
      navigate("/login");
    } catch (error) {
      console.log("Failed to register user:", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler}>
        <div className="form-control">
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                label="Username"
                placeholder="Enter your username"
                type="username"
                variant={"underlined"}
                id="username"
                value={username}
                onChange={userNameHandler}
              />
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                variant={"underlined"}
                id="email"
                value={email}
                onChange={userEmailHandler}
              />
            </div>
          </div>
        </div>

        <div className="form-control">
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant={"underlined"}
                id="password"
                value={password}
                onChange={userPasswordHandler}
              />
            </div>
          </div>
        </div>

        <button data-label="Register" className="rainbow-hover" type="submit">
          <span className="sp">Register</span>
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
