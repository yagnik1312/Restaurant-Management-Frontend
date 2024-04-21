import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar(props: any) {
  const navigate = useNavigate();
  const path:string|undefined = window.location.pathname.split('/').find((item:string)=>{ return item==='dashboard'||item==='rest'} )
  return (
    <>
      <ToastContainer />

      <nav id="NavBar" className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Restaurant
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${localStorage.getItem("token")?'d-none':null}`} to="/login">
                  Log In
                </Link>
              </li>
             
       
              <li className={`nav-item ${localStorage.getItem("token")?null:'d-none'}`}>
                <div
                  role="button"
                  onClick={() =>
                    localStorage.getItem("token")
                      ? confirm("Click Ok to Log Out")
                        ? (toast.success("Log Out Successful !", {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,

                            theme: "light",
                          }),
                          localStorage.removeItem("token"),
                          navigate("/"))
                        : null
                      : toast.error("Please Login First !", {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,

                          theme: "light",
                        })
                  }
                  className="nav-link"
                >
                  Log Out
                </div>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${localStorage.getItem("token")?'d-none':null}`} to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
            </ul>
            {path &&<form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={props.Search}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => props.setSearch(e.target.value)}
              />
            </form>}
          </div>
        </div>
      </nav>
      {/*
       */}
    </>
  );
}
