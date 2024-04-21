import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
export default function LogIn() {
  const navigate = useNavigate();

  const location = useLocation();

  const GotoPayment = (userId: number) => {
    // const CartData = localStorage.getItem("cartData");

    if (location.state) {
      // console.log(location.state.data,"Cart")
      setTimeout(() => {
        navigate("/payment", {
          state: {
            Total: location.state.Total,
            data: location.state.data,
            userId: userId,
          },
        });
      }, 2000);
    } else {
      toast.error("No Item Found in CART !", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: "light",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1600);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  

  const gotoSignInPage = () => {
    if (location.state) {
      navigate("/signin", {
        state: { Total: location.state.Total, data: location.state.data },
      });
    } else {
      navigate("/signin");
    }
  };
  const onSubmit = async (data: any) => {
    const LoginResponse: any = await fetch(
      `http://localhost:5000/users/login`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    const Response = await LoginResponse.json();
    console.log(Response, "Login Response");
    if (Response.message === "Email not Matched") {
      toast.error("No Email Found!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (Response.message === "Password Not Matched") {
      toast.error("Please Enter Valid Password!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else if (Response.details &&Response.details[0]?.message === ('"email" must be a valid email'||"\"email\" must be a valid email")) {
      toast.error("Please Enter Valid Email!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      localStorage.setItem("token", Response.data.token);

      GotoPayment(Response.data.user.userId);
    }
  };
  return (
   <>
   
   <Navbar/>
   <div
      id="LogInFormBody"
      className=" d-flex justify-content-center align-content-center"
    >
      <ToastContainer />
      <div id="Form" className=" d-flex justify-content-center">
        <form
          id="LoginForm"
          className="align-self-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="  justify-content-center text-white text-center mb-5">
            Log In
          </h2>

          <div className="form-group ">
            <label className="h6" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control mb-3"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />

            {errors.email?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Your Email Address
              </small>
            )}
            {errors.email?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid Email Address
              </small>
            )}
          </div>

          <div className="form-group">
            <label className="h6" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control mb-3"
              id="password"
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              })}
            />

            {errors.password?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Password
              </small>
            )}

            {errors.password?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Password Should Contain Min 8 letter , with at least a symbol,
                upper and lower case letters and a number
              </small>
            )}
          </div>
          <div
            onClick={() => gotoSignInPage()}
            className="link-info cursor-pointer underline text-decoration-underline"
            role="button"
          >
            Sign In?
          </div>
          <div className="form-check d-flex justify-content-center ps-0">
            <button className="btn btn-danger submitButtom" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </> 
   
  );
}
