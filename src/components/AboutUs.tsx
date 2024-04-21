import FoodImg from "../Images/Food2.png";
import Navbar from "./Navbar";

export default function AboutUs() {
  return (
    <>
       <Navbar/>
<div className="aboutus">
      <div className="wrapper">
        <main className="content">
            <section id="about-us app" className="my-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <img
                      src={FoodImg}
                      className="img-fluid"
                      alt="About Us Image"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <h2 className="mb-4">About Us</h2>
                    <p>
                      We are a team of food enthusiasts who came together to
                      build an app that makes food ordering easy and fun.
                    </p>
                    <p>
                      Our goal is to provide a platform where you can discover
                      new cuisines, order food from your favorite restaurants,
                      and enjoy the convenience of home delivery.
                    </p>
                    <p>
                      We believe that food is not just a necessity but a way to
                      explore different cultures and connect with people. That's
                      why we are passionate about creating a seamless food
                      ordering experience for our users.
                    </p>
                  </div>
                </div>
              </div>
            </section>
        </main>
        <footer className="footer bg-dark text-light py-3">
      <div className="container ">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 text-center">
            <p>
              Copyright © 2023
              <a href="#">Food Ordering App</a>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
      </div>
    </div>
    </>
  );
}

