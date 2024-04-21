import {Link} from 'react-router-dom'
import { RestaurantType } from  './Restaurant'



export default function Restaurant_item(props:RestaurantType) {
  return (
    <>
  
    <div className="card  Restaurant" >
  <Link to={`/rest/${props.restaurantId}`}><img src={props.imgUrl} className="card-img-top RestaurantImage"  alt="..."/></Link>
  <div className="card-body">
    <h5 className="card-title">{props.restaurantName}</h5>
    <p className="card-text">{props.description}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Rating : {props.rating}</li>
    <li className="list-group-item">Restaurant Type : {props.category}</li>
    <li className="list-group-item">Address : {props.address}</li>
  </ul>
  <div className="card-body">
    <Link to={`/rest/${props.restaurantId}`} className="card-link text-decoration-none">Visit</Link>  
  </div>
</div>


    
    </>
  )
}

