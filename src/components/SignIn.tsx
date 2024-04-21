import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";


export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const GotoPayment = (userId:number) => {
    const CartData = localStorage.getItem("cartData");

    if (CartData) {
      navigate("/payment",{
        state: { Total: location.state.Total, data: location.state.data,userId: userId},
      });
    } else {
      toast.error('No Item Found in CART !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     
        theme: "light",
        });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async(data: any) => {
   const Resp= await fetch(`http://localhost:5000/users`, {
      method:'post',
      headers: new Headers({
    
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name:data.fullname,
        gender:data.gender,
        state:data.state,
        phoneNumber:parseInt(data.phone),
        email: data.email,
        password: data.password,
      }),
    });
    const Response = await Resp.json()
    if(Response.message ==="User already exists"){
      toast.error('Email Already Registered !', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     
        theme: "light",
        });
    }
    else{
if(location.state){
  localStorage.setItem('token',Response.data.token)

  const userId = Response.data.newUser.userId;
  GotoPayment(userId);
}
else if(Response.status==="success"){
  console.log(Response,"----------")

  toast.success('Sign In Successful !', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
 
    theme: "light",
    });
    localStorage.setItem('token',Response.data.token)

    setTimeout(() => {
      navigate("/dashboard");
    }, 4000);

}
else{
  toast.error('Request Fail !', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
 
    theme: "light",
    });  
}
      // localStorage.setItem(data.email, JSON.stringify(data));
    }

  };

  return (
   <> 
      <Navbar/>
<div
      id="SignInFormBody"
      className="d-flex justify-content-center align-item-center "
    >
              <ToastContainer />

      <div id="FormContainer" className="w-75">
        <form
          id="SignInForm"
          className="align-self-center   d-flex flex-column flex-wrap "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="  justify-content-center text-white text-center mb-1">
            Sign In
          </h2>
          <div className="form-group input-group-sm ">
            <label className="h6" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              className="form-control mb-1"
              id="fullname"
              {...register("fullname", {
                required: true,
                pattern: /^[a-zA-Z]+[ ][a-zA-Z]+([ ][a-zA-Z])*$/,
              })}
            />
            {errors.fullname?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Your Full Name
              </small>
            )}
            {errors.fullname?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid Full Name
              </small>
            )}
          </div>
          <div className="form-group input-group-sm ">
            <label className="h6" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control mb-1 "
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
          <div className="form-group input-group-sm ">
            <label className="h6" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control mb-1"
              id="phone"
              {...register("phone", {
                required: true,
                pattern: /^[6-9][0-9]{9}$/,
              })}
            />
            {errors.phone?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Phone Number
              </small>
            )}
            {errors.phone?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter 10 Digit Valid Phone Number
              </small>
            )}
          </div>
          <div className="form-group input-group-sm  text-wrap">
            <label className="h6" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control mb-1"
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
             <p className=" d-flex flex-wrap text-wrap"> <small id="Small" className=" text-wrap form-text text-warning">
                
                  Password Should Contain Min 8 letter , with at least a symbol,
                  upper and lower case letters and a number
                                </small>
                </p>
            )}
          </div>
          <div className="d-flex ">
            <label className="h6 me-1" htmlFor="gender">
              Gender:
            </label>
            <div className="form-check form-check-inline pe-1">
              <input
                className="form-check-input small"
                type="radio"
                id="male"
                value="male"
                {...register("gender", { required: true })}
              />
              <label className="form-check-label" htmlFor="male">
                male
              </label>
            </div>
            <div className="form-check form-check-inline ps-1 ">
              <input
                className="form-check-input small"
                type="radio"
                id="female"
                value="female"
                {...register("gender", { required: true })}
              />
              <label className="form-check-label" htmlFor="female">
                female
              </label>
            </div>
            <div className="form-check form-check-inline ps-1">
              <input
                className="form-check-input small"
                type="radio"
                id="other"
                value="other"
                {...register("gender", { required: true })}
              />
              <label className="form-check-label" htmlFor="other">
                other
              </label>
            </div>
          </div>
          {errors.gender?.type === "required" && (
            <small id="Small" className="form-text text-warning">
              Please Select Your Gender
            </small>
          )}

          <select
            className="form-select form-select-sm mb-1"
            {...register("state", { required: true })}
          >
            <option value="">Select your state</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
          </select>

          {errors.state?.type === "required" && (
            <small id="Small" className="form-text text-warning">
              Please Select Your State
            </small>
          )}
          <br />
          <div className="form-check form-check-inline d-flex">
            <input
              className="form-check-input ms-0"
              type="checkbox"
              id="terms  and conditions"
              {...register("TermsAndConditions", { required: true })}
            />
            <label className="form-check-label mb-1 ms-2" htmlFor="terms  and conditions">
              I agree all terms and conditons
            </label>
          </div>
          <br />
          {errors.TermsAndConditions?.type === "required" && (
            <small id="Small" className="form-text text-warning">
              Please Select Term and Conditions
            </small>
          )}
           <Link className="  link-info"
           to='/login'
          >
            Log In?
          </Link>
          <div className="form-check d-flex justify-content-center ps-0">
            <button className="btn btn-primary submitButtom" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
