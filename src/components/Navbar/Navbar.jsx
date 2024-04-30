import React, { useContext } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { TotalCostContext } from '../../contexts/TotalCostContext';

const Navbar = () => {
    
  // Extracting 'totalCount' variable from 'TotalCostContext'
  // 'totalCount' variable shows the total number of items that has been added to a user's cart  
  const { totalCount } = useContext(TotalCostContext);

  return (
    <div className="nav">
        <nav>
            <div className="logo">
                <img src="/Images/Logo/store logo.jpg" alt="store logo" />
            </div>
            <ul>
                <li>
                    <NavLink to="/checkout" className="cart-counts">
                        <img className="icon" src="/Icons/shopping_cart.svg" alt="shopping cart" />
                        <h3 className="raleway-semibold total-counts">{totalCount}</h3>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar