import { useDispatch } from "react-redux"
import { clearcart } from "../features/cart/cartSlice"
import { memo } from "react"
import { modalopen } from "../features/modal/modalSlice"






 function Modal(){
    const dispatch=useDispatch()
return <aside className="modal-container">
    <div className="modal">
        <h4 className="modal h4">remove all items from your shopping cart?</h4>
        <div className="btn-container">
           <button onClick={()=>{
            dispatch(clearcart())
            dispatch(modalopen(false))
        }}  className="modal confirm-btn">CONFIRM</button>
           <button onClick={()=>{dispatch(modalopen(false))}} className="modal clear-btn">CANCEl</button>
        </div>
    </div>
</aside>
}

export const MemoModal=memo(Modal)