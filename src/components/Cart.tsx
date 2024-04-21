import React, { useEffect, useState, useContext } from "react";
import CartItem from "./CartItem";
import { FoodItemType } from "./RestaurantInfo";
import { Context } from "./RestaurantInfo";
import { useNavigate } from "react-router-dom";


export interface CartItemType {
  FoodName: String;
  FoodPrice: number;
  FoodId: Number;
  Quantity?: number;
  setCartItemsData: any;
  CartItemsData: FoodItemType[];
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  Total: number;
}

export default function Cart(props: any) {
  const navigate = useNavigate();

  const [Total, setTotal] = useState<number>(0);
  const GotoLogIn =async (CartItemsData: FoodItemType[]) => {


    localStorage.setItem("cartData", JSON.stringify(CartItemsData));
    
    try {
  const checkToken:any = localStorage.getItem('token')
  const AuthResponse: any = await fetch(
    `http://localhost:5000/checkUser`,
    {
       
      headers: new Headers({
        Authorization:
            `${checkToken}`,
            "Content-Type": "application/json",
          }),
      
        }
        );
        if(AuthResponse.status===200){
          const Response = await AuthResponse.json();
          // console.log(Response.data.user.userId)

          navigate("/payment", {
            state: {
              Total: Total,
              data: CartItemsData,
              userId: Response.data.user.userId,
            },
          });



        }
        else{
          navigate("/login",{state:{Total:Total,data:CartItemsData}});
        }
    

} catch (error) {
  console.log(error)
}
 
          

  };

  const CartState: any = useContext(Context);

  const [CartItemsData, setCartItemsData] = useState<FoodItemType[]>(
    CartState.cart
  );
  // console.log(CartItemsData);

  useEffect(() => {
    setCartItemsData(CartState.cart);
    // console.log(CartState.cart)
  }, [CartState.cart]);

  return (
    <ol className="list-group ">
      {CartItemsData &&
        CartItemsData.map((Food: FoodItemType, index: any) => {
          return (
            <CartItem
              key={index}
              FoodName={Food.foodName}
              FoodPrice={Food.foodPrice}
              FoodId={Food.foodId}
              setCartItemsData={setCartItemsData}
              CartItemsData={CartItemsData}
              setTotal={setTotal}
              Total={Total}
              Quantity={Food.quantity}
            />
          );
        })}
      <h3 className="d-flex justify-content-center my-2">
        <span id="TotalPrice" className="badge  w-100 mx-3">
          {Total}
        </span>
      </h3>

      <button
        onClick={() => GotoLogIn(CartItemsData)}
        id="Checkout"
        type="button"
        className="btn rounded-5 btn-success bg-gradient btn-lg "
      >
        CHECKOUT
      </button>
    </ol>
  );
}
