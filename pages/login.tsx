import axios from "axios";
import Router from "next/router";
const login = () => {
  const handlelogin = async () => {
    try {
      await axios.post("/api/users/login", {
        email: "mohammadjamol@gmail.com",
        password: "123456",
      });
      Router.push("/");
    } catch (error) {}
  };
  return (
    <div>
      login page
      <button onClick={handlelogin}>Login</button>
    </div>
  );
};

export default login;
