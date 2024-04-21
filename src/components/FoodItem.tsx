import { FoodItemType } from "./RestaurantInfo";
export default function FoodItem(props: FoodItemType) {



  return (
    <>
      <div  >
        <div id="Card" className="card sm-3 mb-3 bg-light">
          <div className="row g-0">
            <div className="col-sm-4 ">
              <img id="FoodImg"
                src={props.foodImage}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-sm-8">
              <div className="card-body">
                <h5 className="card-title">{props.foodName}</h5>
                <p className="card-text">{props.foodDescription}</p>
                <p id="FoodPrice" className="card-text">₹ {props.foodPrice}</p>
                <p className="card-text">
                  <small className="text-muted">{props.foodCategory}</small>
                </p>
                <button
                  type="button"
                  onClick={() => props.AddToCart(props.FoodData)}
                  className="btn btn-outline-warning"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
