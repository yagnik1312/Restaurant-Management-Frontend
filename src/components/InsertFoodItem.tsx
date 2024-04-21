import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Restaurants_Data from "../Data/Restaurants_Data.json";

export default function InsertFoodItem() {
  const [FoodData, setFoodData] = useState<any>(
    //  JSON.parse(localStorage.getItem("FoodData")!)
    ""  );
  useEffect(() => {
    // localStorage.setItem("FoodData", JSON.stringify(Restaurants_Data))
  setFoodData(JSON.parse(localStorage.getItem("FoodData")!))
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  useEffect(() => {
  console.log(FoodData.Foods,"changed")
  }, [FoodData])
  const onSubmit = (data: any) => {
    console.log(data);
    // setFoodData(JSON.parse(FoodData));
    console.log(FoodData)
   const Data:any =  FoodData.Foods[data.RestaurantId as keyof typeof Restaurants_Data.Foods]
   const { RestaurantId,FoodPrice,FoodCategoryId,FoodId,FoodName,FoodDescription,FoodCategory, FoodImage } = data;
   const FoodItem = {
    "FoodPrice": parseInt(FoodPrice),
    "FoodCategoryId": parseInt(FoodCategoryId),
    "FoodId": parseInt(FoodId),
    "FoodName":FoodName,
    "FoodDescription": FoodDescription,
    "FoodCategory":FoodCategory ,
    "FoodImage":FoodImage,
  
  }
   
    setFoodData({...FoodData,Foods:{...FoodData.Foods,[data.RestaurantId]:[...Data,FoodItem]} })
    localStorage.setItem("FoodData",JSON.stringify(FoodData))
  };

  return (
    <>
    <div className="h1 d-flex justify-content-center my-4">Enter Your Restaurant Data</div>
      <div className="align-self-center justify-content-center  d-flex ">
        <form
          className="align-self-center  d-flex flex-column p-2 border shadow rounded mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="RestaurantId">
              Restaurant Id
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="RestaurantId"
                size={50}
                {...register("RestaurantId", {
                  required: true,
                  pattern:/^[1-9][0-9]*$/,
                })}
              />
            </div>
            {errors.RestaurantId?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Restaurant Id
              </small>
            )}
            {errors.RestaurantId?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid Restaurant Id
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodName">
              Food Name
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="FoodName"
                size={50}
                {...register("FoodName", {
                  required: true,
                  pattern: /^[a-zA-Z]+([ ][a-zA-Z]+)*$/,
                })}
              />
            </div>
            {errors.FoodName?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter FoodName
              </small>
            )}
            {errors.FoodName?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid FoodName
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodId">
              FoodId
            </label>
            <div className="col-sm-7">
              <input
                type="number"
                className="form-control mb-1 "
                id="FoodId"
                size={50}
                {...register("FoodId", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
            </div>
            {errors.FoodId?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter FoodId
              </small>
            )}
            {errors.FoodId?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid FoodId
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodCategoryId">
              FoodCategory Id
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="FoodCategoryId"
                size={50}
                {...register("FoodCategoryId", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
            </div>
            {errors.FoodCategoryId?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter FoodCategory Id
              </small>
            )}
            {errors.FoodCategoryId?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid FoodCategory Id
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodPrice">
              Food Price
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="FoodPrice"
                size={50}
                {...register("FoodPrice", {
                  required: true,
                  pattern: /^[1-9][0-9]*$/,
                })}
              />
            </div>
            {errors.FoodPrice?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Food Price
              </small>
            )}
            {errors.FoodPrice?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid Food Price
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodDescription">
              Food Description
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="FoodDescription"
                size={50}
                {...register("FoodDescription", {
                  required: true,
                  pattern: /^[a-zA-Z]+([ ][a-zA-Z]+)*$/,
                })}
              />
            </div>
            {errors.FoodDescription?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Food Description
              </small>
            )}
            {errors.FoodDescription?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid Food Description
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodCategory">
              Food Category
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="FoodCategory"
                size={50}
                {...register("FoodCategory", {
                  required: true,
                  pattern: /^[a-zA-Z]+([ ][a-zA-Z]+)*$/,
                })}
              />
            </div>
            {errors.FoodCategory?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Food Category
              </small>
            )}
            {errors.FoodCategory?.type === "pattern" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Valid Food Category
              </small>
            )}
          </div>
          <div className="form-group mt-1 row">
            <label className="h6 col-sm-5" htmlFor="FoodImage">
              Food Image Url
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                className="form-control mb-1 "
                id="FoodImage"
                size={50}
                {...register("FoodImage", {
                  required: true,
                })}
              />
            </div>
            {errors.FoodImage?.type === "required" && (
              <small id="Small" className="form-text text-warning">
                Please Enter Food Image Url
              </small>
            )}
          </div>
          <div className="form-check d-flex justify-content-center ps-0">
            <button className="btn btn-danger submitButtom" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
