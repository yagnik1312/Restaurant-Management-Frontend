import { useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const Token: any = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const setOrder = async (total: number, data: any) => {
    const FoodItems: string[] = [];
    data.map((item: any) => {
      FoodItems.push(item.foodName);
    });
    const Data: any = await fetch(`http://localhost:5000/Orders`, {
      method: "POST",
      headers: new Headers({
        Authorization: `${Token}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        Amount: total,
        FoodItems: FoodItems,
        UserID: location.state.userId,
      }),
    });
    const Response = await Data.json();
    return Response;
  };
  const GeneratePdf = (data: any, total: number, productData: any) => {
    const date = new Date();
    const doc = new jsPDF();

    autoTable(doc, {
      body: [
        [
          {
            content: "CAPTAIN",
            styles: {
              halign: "left",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
          {
            content: "Invoice",
            styles: {
              halign: "right",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
        ],
      ],
      theme: "plain",
      styles: {
        fillColor: "#3366ff",
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              "Reference: #INV0001" +
              `\nDate: ${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}` +
              `\nInvoice number: ${Math.floor(Math.random() * 10000)}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              "Billed to:" +
              `\n${data.cardHolderName}` +
              `\n${data.address}` +
              `\n${data.zip}` +
              `\n${data.state}`,
            styles: {
              halign: "left",
            },
          },
          {
            content:
              "Shipping address:" +
              `\n${data.cardHolderName}` +
              `\n${data.address}` +
              `\n${data.zip}` +
              `\n${data.state}`,
            styles: {
              halign: "left",
            },
          },
          {
            content:
              "From:" +
              "\nCAPTAIN" +
              "\nSYNOVERGE PVT. LTD." +
              "\nSUNRISE PARK ROAD" +
              "\nAHMEDABAD" +
              "\nGUJARAT",
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Amount:",
            styles: {
              halign: "right",
              fontSize: 14,
            },
          },
        ],
        [
          {
            content: `Ruppes:${total}`,
            styles: {
              halign: "right",
              fontSize: 20,
              textColor: "#3366ff",
            },
          },
        ],
        [
          {
            content: `Date: ${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Products & Services",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      head: [["Items", "Category", "Quantity", "Price", "Tax", "Amount"]],
      body: productData.map((item: any) => {
        return [
          item.foodName,
          item.foodCategory,
          item.quantity,
          item.foodPrice,
          "0",
          item.quantity * item.foodPrice,
        ];
      }),

      theme: "striped",
      headStyles: {
        fillColor: "#343a40",
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Total amount:",
            styles: {
              halign: "right",
            },
          },
          {
            content: `${total}`,
            styles: {
              halign: "right",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Terms & notes",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
        [
          {
            content:
              "This Application is Created by Rathod Yagnik " +
              "in the Time of React Training",
            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Thank you for Shopping",
            styles: {
              halign: "center",
            },
          },
        ],
      ],
      theme: "plain",
    });

    doc.save("invoice.pdf");
  };

  const onSubmit = async (data: any) => {
    if (localStorage.getItem("cartData")) {
      // console.log(data);
      try {
        const Response = await setOrder(
          location.state.Total,
          location.state.data
        );
        console.log(Response, "Response");
        if (Response.message === "Successfully created") {
          toast.success("Payment successful !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            theme: "light",
          });
          localStorage.removeItem("cartData");
          reset();
          GeneratePdf(data, location.state.Total, location.state.data);

          location.state.Total = null;
          setTimeout(() => {
            navigate("/dashboard");
          }, 4000);
        } else if (Response.error === "Please authenticate.") {
          toast.error("Please Login First !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

            theme: "light",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 4000);
        }
        // location.state.Total=0
      } catch (error) {}
    } else {
      toast.error("No Data Found in Your Cart !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: "light",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    }
  };

  useEffect(() => {
    location.state ? null : navigate("/");
  }, []);

  return (
    <>
    <Navbar/>
      <div>
        <ToastContainer />
      </div>

      {location.state && (
        <div className="container d-lg-flex justify-content-center mt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <p className="fw-bold">Payment Details</p>
                <p className="dis mb-3">
                  Complete your purchase by providing your payment details
                </p>
              </div>

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
              <div>
                <p className="dis fw-bold mb-2">Card details</p>
                <div className="d-flex align-items-center justify-content-between card-atm border rounded">
                  <div className=" w-100 mt-0 ">
                    <InputMask
                      mask="9999-9999-9999-9999"
                      type="text"
                      className="form-control  d-flex align-items-sm-start "
                      placeholder="1111-0000-2222-3333"
                      {...register("cardDetails", {
                        required: true,
                        pattern: /^[1-9][0-9]{3}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                      })}
                    />
                    <small id="Small" className="form-text text-warning">
                      {errors.cardDetails?.type === "required" && (
                        <p>Please Enter Your Card Number </p>
                      )}
                    </small>

                    {errors.cardDetails?.type === "pattern" && (
                      <small id="Small" className="form-text text-warning">
                        Please Enter Card Number Like "0000-1111-2222-3333"
                        <br />
                      </small>
                    )}
                  </div>

                  <div className="d-flex w-50">
                    <div>
                      <InputMask
                        type="text"
                        mask="99/99"
                        className="form-control px-0 d-flex align-items-sm-start"
                        placeholder="MM/YY"
                        {...register("cardExpiry", {
                          required: true,
                          pattern: /^(([0][1-9])|([1][0+1+2]))\/[0-9]{2}$/,
                        })}
                      />
                      {errors.cardExpiry?.type === "required" && (
                        <small id="Small" className="form-text text-warning">
                          Please Enter Your Card Expiry
                          <br />
                        </small>
                      )}
                      {errors.cardExpiry?.type === "pattern" && (
                        <small id="Small" className="form-text text-warning">
                          Please EnterValid Expiry Data
                          <br />
                        </small>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        maxLength={4}
                        className="form-control px-0 d-flex align-items-sm-start"
                        placeholder="CVV"
                        {...register("cvv", {
                          required: true,
                          pattern: /^[0-9]{3,4}$/,
                        })}
                      />

                      {errors.cvv?.type === "required" && (
                        <small id="Small" className="form-text text-warning">
                          Please Enter CVV
                          <br />
                        </small>
                      )}

                      {errors.cvv?.type === "pattern" && (
                        <small id="Small" className="form-text text-warning">
                          Please Enter Valid CVV
                          <br />
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-3 cardname">
                  <p className="dis fw-bold mb-2">Cardholder name</p>
                  <input
                    className="form-control"
                    type="text"
                    {...register("cardHolderName", {
                      required: true,
                      pattern: /^[a-zA-Z]+([ ][a-zA-Z]+){0,1}$/,
                    })}
                  />

                  {errors.cardHolderName?.type === "required" && (
                    <small id="Small" className="form-text text-warning">
                      Please Enter CardHolder Name
                    </small>
                  )}

                  {errors.cardHolderName?.type === "pattern" && (
                    <small id="Small" className="form-text text-warning">
                      Please Enter Valid CardHolder Name
                    </small>
                  )}
                </div>
                <div className="address">
                  <p className="dis fw-bold mb-3">Billing address</p>
                  <div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("state", { required: true })}
                    >
                      <option value="">Please Select State</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    {errors.state?.type === "required" && (
                    <small id="Small" className="form-text text-warning">
                      Please Select State
                      <br />
                    </small>
                  )}
                  </div>
                  <div className="d-flex">
                    <div>
                      <input
                        className="form-control zip"
                        type="text"
                        placeholder="ZIP"
                        {...register("zip", {
                          required: true,
                          pattern: /^[0-9]{4,6}$/,
                        })}
                      />
                        {errors.zip?.type === "required" && (
                    <small id="Small" className="form-text text-warning">
                      Please Enter ZIP Code
                      <br />
                    </small>
                  )}
                  {errors.zip?.type === "pattern" && (
                    <small id="Small" className="form-text text-warning">
                      Please Enter Valid ZIP Code
                      <br />
                    </small>
                  )}
                    </div>
                    <div className="w-100">
                      <input
                        className="form-control state "
                        type="text"
                        placeholder="Address"
                        {...register("address", {
                          required: true,
                        })}
                      />
                        {errors.address?.type === "required" && (
                    <small id="Small" className="form-text text-warning">
                      Please Enter Your Address
                      <br />
                    </small>
                  )}
                    </div>
                  </div>
                 
                
                

                  <div className="d-flex flex-column dis">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <p className="fw-bold">Total</p>
                      <p className="fw-bold">
                        <span className="fas fa-dollar-sign"></span>
                        {location.state.Total}
                      </p>
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">
                      Pay<span className="fas fa-dollar-sign px-1"></span>
                      {location.state.Total}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
