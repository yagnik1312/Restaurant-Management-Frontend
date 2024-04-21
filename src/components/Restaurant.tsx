import { useState, useEffect } from "react";
import RestaurantItem from "./RestaurantItem";
// import img from "../Images/Restaurant.jpeg";
import ReactPaginate from "react-paginate";
import Navbar from "./Navbar";

export interface RestaurantType {
  restaurantId: Number;
  restaurantName: String;
  description: String;
  address: String;
  category: String;
  rating: Float32List;
  imgUrl: any;
  CREATED_ON?: any;
  MODIFIED_ON?: any;
}

export default function Restaurant(props: any) {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [CategoryType, setCategoryType] = useState<string>("All");
  const [RestaurantsList, setRestaurantList] = useState<RestaurantType[]>([]);
  const [pageCount, setpageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [PageNumber, setPageNumber] = useState<number>(0);
  const [Search, setSearch] = useState<string>("");

  const itemsPerPage: number = 3;
  const getData = async () => {
    const Data: any = await fetch(
      `http://localhost:5000/Restaurantss?skip=${itemOffset}&limit=${itemsPerPage}&sortBy=restaurantId:asc&Search=${Search}`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
    const Restaurants = await Data.json();
    setRestaurants(Restaurants.data.result);
    setRestaurantList(Restaurants.data.result);

    setpageCount(Math.ceil(Restaurants.data.count / itemsPerPage));
  };
  const getCategoryData = async (category: string) => {
    const Data: any = await fetch(
      `http://localhost:5000/RestaurantssCategory?skip=${itemOffset}&limit=${itemsPerPage}&sortBy=restaurantId:asc&category=${category}`,
      {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
    const Restaurants = await Data.json();
    setRestaurants(Restaurants.data.result);
    setRestaurantList(Restaurants.data.result);

    setpageCount(Math.ceil(Restaurants.data.count / itemsPerPage));
  };

 
  useEffect(() => {
    if (CategoryType === "All") {
      getData();
    } else {
      getCategoryData(CategoryType);
    }
  }, [itemOffset]);

  const filterRestaurants = (categoryType: string) => {
    if (categoryType === "All") {
      if (CategoryType !== "All") {
        setItemOffset(0);
        getData();
        setCategoryType(categoryType);
      }
    } else {
      if (CategoryType !== categoryType) {
        setCategoryType(categoryType);
        getCategoryData(categoryType);
      }
    }
  };

  const handlePageClick = (event: any) => {
    setItemOffset(event.selected * itemsPerPage);
    setPageNumber(event.selected)
  };

  useEffect(() => {
    if (Search.trim().length > 0) {
      setItemOffset(0);
      getData();
      setPageNumber(0)
    } else if (Search.length === 0) {
      setItemOffset(0);
      getData();
      setPageNumber(0)
    }
  }, [Search]);

  return (
    <>
     <Navbar Search={Search} setSearch={setSearch} />
      {RestaurantsList.length > 0 && (
        <div className="d-flex justify-content-center">
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={() => filterRestaurants("All")}
            >
              All
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={() => filterRestaurants("Veg")}
            >
              Veg
            </button>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={() => filterRestaurants("Non Veg")}
            >
              Non Veg
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={() => filterRestaurants("Both")}
            >
              Both
            </button>
          </div>
        </div>
      )}
      <div className="row container-fluid m-0">
        {Search.length === 0 ? (
          restaurants.length > 0 ? (
            restaurants.map((Restaurant: RestaurantType, index: any) => {
              return (
                <div className="col-sm-4" key={index}>
                  <RestaurantItem
                    restaurantName={Restaurant.restaurantName}
                    description={Restaurant.description}
                    rating={Restaurant.rating}
                    category={Restaurant.category}
                    address={Restaurant.address}
                    imgUrl={Restaurant.imgUrl}
                    // id={Restaurant.id}
                    restaurantId={Restaurant.restaurantId}
                  />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center NoData align-items-center">
              <h3>No Data Found</h3>{" "}
            </div>
          )
        ) : restaurants.length > 0 ? (
          restaurants.map((Restaurant: RestaurantType, index: number) => {
            {
              return (
                <div className="col-sm-4" key={index}>
                  <RestaurantItem
                    restaurantName={Restaurant.restaurantName}
                    description={Restaurant.description}
                    rating={Restaurant.rating}
                    category={Restaurant.category}
                    address={Restaurant.address}
                    imgUrl={Restaurant.imgUrl}
                    // id={Restaurant.id}
                    // imgUrl={img}
                    restaurantId={Restaurant.restaurantId}
                  />
                </div>
              );
            }
          })
        ) : (
          <div className="d-flex justify-content-center NoData align-items-center">
            <h3>No Data Found</h3>
          </div>
        )}
      </div>

      <div className="mt-3 d-flex justify-content-center container-fluid">
        {restaurants && restaurants.length !== 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
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
