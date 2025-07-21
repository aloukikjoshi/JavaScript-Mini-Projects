import { useSelector,useDispatch } from "react-redux";
import { MemoCartitem } from "./cartitem";
import { memo } from "react";
import { modalopen } from "../features/modal/modalSlice";



 function Middlemen(){
    const {total,cartitems,amount}=useSelector((store)=>store.cart)
const dispatch=useDispatch()

    if(amount<1){
        return <section className="cart">
            <header>
                <h2>your bag</h2>
                <h4 className="empty-cart">is currently empty</h4>
            </header>
        </section>
    }
   
    return (
        <section className="cart">
        <header>
            <h2>your bag</h2>
        </header>
        <div>{cartitems.map((item)=>{
            return <MemoCartitem key={item.id} {...item}></MemoCartitem>
        })}</div>
        <footer>
            <div className="cart-total">
            <hr />
            <h4>total <span>${total.toFixed(2)}</span></h4>
            </div>
           <button onClick={()=>{
            dispatch(modalopen(true))
            }} className="btn clear-btn">clear cart</button>
        </footer>
        </section>
    )
}

export const MemoMiddlemen=memo(Middlemen)