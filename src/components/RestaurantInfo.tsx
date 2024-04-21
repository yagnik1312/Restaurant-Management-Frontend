import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cart from "./Cart";
import FoodItem from "./FoodItem";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

export interface FoodItemType {
  restaurantId?: number;
  foodId: Number;
  foodCategoryId?: number;
  foodName: String;
  foodPrice: number;
  foodDescription: String;
  foodCategory: String;
  foodImage: any;
  quantity?: number;
  AddToCart?: any;
  FoodData?: FoodItemType;
  CREATED_ON?: any;
  MODIFIED_ON?: any;
  setSearch?:any
}

export const Context: any = createContext(null);

function RestaurantInfo(props: any) {
  const [cart, setCart] = useState<FoodItemType[]>([]);
  // const CategoryData: string[] = ["All"];
  const [Category, setCategory] = useState<string[]>([]);
  const [RestaurantsData, setRestaurantsData] = useState<FoodItemType[]>([]);
  const [RestaurantAllFoods, setRestaurantAllFoods] = useState<FoodItemType[]>(
    []
  );


  const [PageNumber, setPageNumber] = useState<number>(0);


  const [pageCount, setpageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage: number = 3;

  const params: string | undefined = useParams().id;



  const [Search, setSearch] = useState<string>("");






  const getFoodData = async () => {
    const Data: any = await fetch(
      `http://localhost:5000/RestaurantsDatas/${params}?skip=${itemOffset}&limit=${itemsPerPage}&sortBy=foodId:asc&Search=${Search}`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
    const FoodData = await Data.json();
    setRestaurantsData(FoodData.data.result);
    setRestaurantAllFoods(FoodData.data.result);
      setpageCount(Math.ceil(FoodData.data.count / itemsPerPage));
  };


  
  useEffect(() => {
    getFoodData();
  }, [itemOffset]);

  useEffect(() => {
    if (Search.trim().length > 0) {
      setItemOffset(0);
      getFoodData();
      setPageNumber(0)

    } else if (Search.length === 0) {
      setItemOffset(0);
      getFoodData();
      setPageNumber(0)
    }
  }, [Search]);

  const AddToCart = (Food: any) => {
    const idx: any = cart.findIndex((item) => item.foodId === Food.foodId);
    if (idx === -1) {
      setCart([...cart, { ...Food, quantity: 1 }]);
    } else {
      toast.warning("You Have Already Added This Item to Cart !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: "light",
      });
    }
  };

  useEffect(() => {
    const CategoryData = ["All"];
    RestaurantAllFoods.map((item: FoodItemType) => {
      if (!CategoryData.includes(item.foodCategory as string)) {
        CategoryData.push(item.foodCategory as string);
      }
    });

    setCategory(CategoryData);
  }, [RestaurantAllFoods]);

  const FilterFood = (Food: String) => {
    if (Food === "All") {
      setRestaurantsData(RestaurantAllFoods);
    } else {
      setRestaurantsData(
        RestaurantAllFoods.filter((item) => {
          return item.foodCategory === Food;
        })
      );
    }
  };

  const handlePageClick = (event: any) => {
    setItemOffset(event.selected * itemsPerPage);
    setPageNumber(event.selected)
  };

  return (
    <>
     <Navbar Search={Search} setSearch={setSearch} />
      <ToastContainer />

      <div className="row">
        <div id="FilterContainer" className="col-sm-3   ">
          <div id="Filter" className=" top-10 start-0 btn-group-vertical ">
            {Category.length > 2 &&
              Category.map((SingleCategory: any, index: number) => {
                return (
                  <button
                    onClick={() => FilterFood(SingleCategory)}
                    className="btn btn-outline-info FoodFilterButton"
                    key={index}
                  >
                    {SingleCategory}
                  </button>
                );
              })}
          </div>
        </div>

        {Search.length === 0 ? (
          <div className="col-sm-6">
            {RestaurantsData.length>0?
              RestaurantsData.map((FoodData: FoodItemType, index: any) => {
                return (
                  <div key={index}>
                    <FoodItem
                      foodId={FoodData.foodId}
                      foodName={FoodData.foodName}
                      foodPrice={FoodData.foodPrice}
                      foodDescription={FoodData.foodDescription}
                      foodCategory={FoodData.foodCategory}
                      foodImage={FoodData.foodImage}
                      AddToCart={AddToCart}
                      FoodData={FoodData}
                    />
                  </div>
                );
              }):<div className="d-flex justify-content-center NoData align-items-center">
              <h3>No Data Found</h3>
            </div>}
          </div>
        ) : (
          <div className="col-sm-6">
            {RestaurantsData.length>0?
              RestaurantsData.map((FoodData: FoodItemType, index: number) => {
                {
                  return (
                    <div key={index}>
                      <FoodItem
                        foodId={FoodData.foodId}
                        foodName={FoodData.foodName}
                        foodPrice={FoodData.foodPrice}
                        foodDescription={FoodData.foodDescription}
                        foodCategory={FoodData.foodCategory}
                        foodImage={FoodData.foodImage}
                        AddToCart={AddToCart}
                        FoodData={FoodData}
                      />
                    </div>
                  );
                }
              }):<div className="d-flex justify-content-center NoData align-items-center">
              <h3>No Data Found</h3>
            </div>}
          </div>
        )}

        <div className="col-sm-3 customCart p-0">
          <div id="Cart" className="customInsideCart">
            {cart.length !== 0 && (
              <Context.Provider value={{ cart, setCart }}>
                <Cart />
              </Context.Provider>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-center align-items-sm-end FoodsPagination">
        {RestaurantsData?.length !== 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="< previous"
            activeClassName={"active"}
            containerClassName={"pagination"}

            forcePage={PageNumber}

            // renderOnZeroPageCount={null}
          />
        )}
      </div>
    </>
  );
}

export default RestaurantInfo;
