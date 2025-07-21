import { useDispatch} from "react-redux"

import { removeitem ,increaseamount,decreaseamount} from "../features/cart/cartSlice"
import { memo } from "react"
import { ChevronUp,ChevronDown } from "../data/icons"




 function Cartitem(props){
    let item=props
    let {id,amount,img,title,price}=item
 const dispatch=useDispatch()
    return (
    
        <article className="cart-item" >
                     <img className="cart-item img" src={img} alt={title} />
                     <div>
                    <h4>{title}</h4>
                    <h4 className="item-price">${price}</h4>
                    <button onClick={()=>{
                        dispatch(removeitem(id))
                      
                        }} className="remove-btn">remove</button>
                    </div>
                    <div>
                        <button onClick={()=>{
                            dispatch(increaseamount(id))
                         
                            }} className="amount-btn">
                            <ChevronUp></ChevronUp>    
                        </button>
                        <p className="amount">{amount}</p>
                        <button onClick={()=>{
                            dispatch(decreaseamount(id))
                        
                            }} className="amount-btn">
                            <ChevronDown></ChevronDown>    
                        </button>
                    </div>
                </article> 
    )
}

export const MemoCartitem=memo(Cartitem)