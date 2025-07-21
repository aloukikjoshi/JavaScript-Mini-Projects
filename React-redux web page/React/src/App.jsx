
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { MemoMiddlemen } from './components/middlemen'
import { MemoModal } from './components/modal'
import { MemoNavbar } from './components/Navbar'
import { useEffect } from 'react'
import { calculatetotal, getCartItems } from './features/cart/cartSlice'




function App() {
  const {isopen}=useSelector((store)=>store.modal)  
  const {cartitems,isloading}=useSelector((store)=>store.cart) 
  const dispatch= useDispatch()
  
  useEffect(()=>{
   dispatch(calculatetotal())
  },[cartitems])

  useEffect(()=>{
  dispatch(getCartItems())
  },[])


if(isloading){
  return <div className="loading">
    <h1>loading...</h1>
  </div>
}


  return (
  <main>
   {isopen && <MemoModal></MemoModal>}
    <MemoNavbar></MemoNavbar>
    <MemoMiddlemen></MemoMiddlemen>
  </main>
  )
}

export default App
