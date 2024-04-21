import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props: any) => {
  const navigate = useNavigate();
  const checkToken = localStorage.getItem("token");
  const Check = async () => {
    const AuthResponse: any = await fetch(`http://localhost:5000/checkUser`, {
      headers: new Headers({
        Authorization: `${checkToken}`,
        "Content-Type": "application/json",
      }),
    });
    if (AuthResponse.status === 200) {
      navigate("/dashboard");
      // console.log(Response.data.user.userId)
    }
  };
  useEffect(() => {
    Check();
  }, []);

  return (
    <>
      <props.Component />
    </>
  );
};

export default Protected;
