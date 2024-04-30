import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import ItemDetails from "./components/Item Details/ItemDetails"
import PaymentPage from "./components/Payment Page/PaymentPage"
import CartCheckout from "./components/CartCheckout/CartCheckout"
import ErrorPage from "./components/ErrorPage/ErrorPage"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ItemDetails />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/checkout" element={<CartCheckout />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  )
}

export default App
