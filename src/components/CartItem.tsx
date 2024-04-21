import  { useContext,  useEffect } from "react";
import  { CartItemType } from "./Cart";
import { MdDelete } from "react-icons/md";
import { Context } from "./RestaurantInfo";

export default function CartItem(props: CartItemType) {
  const CartState: any = useContext(Context);
  useEffect(() => {
    props.setTotal(props.Total + props.FoodPrice);
  }, []);

  const Total = props.Quantity! * props.FoodPrice;


  const handlequantity = (FoodId: Number, Action: string) => {
    const idx: any = props.CartItemsData.findIndex(
      (item) => item.foodId === FoodId
    );

    const Quanitity: number = props.CartItemsData[idx].quantity!;

    // console.log(props.CartItemsData[idx].quantity);
    if (Action === "+") {
      props.setTotal(props.Total + props.FoodPrice);
      CartState.setCart(
        props.CartItemsData.map((item, index) => {
          if (index === idx) {
            return {
              ...props.CartItemsData[idx],
              quantity: Quanitity + 1,

            };
          } else {
            return item;
          }
        })
      );
    } else {
      if (Quanitity > 1){
        props.setTotal(props.Total - props.FoodPrice);
        CartState.setCart(
          props.CartItemsData.map((item, index) => {
            if (index === idx) {
              return { ...props.CartItemsData[idx], quantity: Quanitity - 1 };
            } else {
              return item;
            }
          })
        );}
    }
  };
  const deleteFoodItem = (FoodId: Number) => {
    const idx: any = props.CartItemsData.find(
      (item) => item.foodId === FoodId
    );
    console.log(CartState.cart,"Carttttttttt")
    CartState.setCart(
      CartState.cart.filter((item:any) => {
        return item.foodId !==FoodId;
      })
      );



   CartState.setCart(
      CartState.cart.filter((item:any) => {
        return item.foodId !==FoodId;
      })
      );
      props.setTotal(props.Total - (props.FoodPrice*idx.quantity!));
    // props.setTotal(props.Total - (quantity * props.FoodPrice));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start flex-nowrap">
      <div className="ms-0 me-auto">
        <div className="fw-bold">{props.FoodName}</div>
        <div className="col-12">
          <div className="input-group ">
            <div className="input-group-prepend  ">
              <button
                className="btn btn-outline-primary btn-sm quantityButton"
                type="button"
                onClick={() => handlequantity(props.FoodId, "-")}
              >
                -
              </button>
            </div>

            <h3>
              <span className="badge bg-light p-2  fs-6 text-dark">
                {props.Quantity}
              </span>
            </h3>

            <div className="input-group-prepend quantityButton">
              <button
                className="btn btn-outline-primary btn-sm"
                type="button"
                onClick={() => handlequantity(props.FoodId, "+")}
              >
                +
              </button>
            </div>

            <div className="input-group-prepend">
              <button
                id="FoodItemDeleteIcon"
                className="btn btn-outline-danger btn-sm ms-1"
                type="button"
                onClick={() => deleteFoodItem(props.FoodId)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
      <span className="badge bg-success p-1 ">₹{Total}</span>
    </li>
  );
}
