import React, { useContext, useState } from 'react'
import './ItemDetails.css';
import { useParams } from 'react-router-dom';
import { products } from '../../consts/products';
import { TotalCostContext } from '../../contexts/TotalCostContext';
import Rating from '../Rating';
import { gameReviews } from '../../consts/reviews';
import { CartContext } from '../../contexts/CartContext';
import Footer from '../Footer/Footer';

const ItemDetails = () => {
    const [itemCount, setItemCount] = useState(0);

    // Extracting functions from 'TotalCostContext'
    const { handleTotalCostIncrement, handleTotalCostReduction, handleTotalCountReduction, handleTotalCountIncrement } = useContext(TotalCostContext);

    // Extracting 'addToCart' function from 'CartContext'
    const { addToCart } = useContext(CartContext);

    // Handling Navigation Parameters
    const { id } = useParams();
    // Check if the item with the provided 'id' exists in the 'products' array
    const matchedItem = products.find(item => String(item.id) === id);
    const { gameName, image, description, price, rating, vendor, discount } = matchedItem;

    // Get matching reviews of the game selected
    const matchedReviews = gameReviews.find(item => String(item.id) === id);
    const { reviews } = matchedReviews;

    // Determine the actual price of the product if there's a discount
    let actualPrice = 0;
    if(discount) {
      actualPrice = price - ((discount / 100) * price);
    } else {
      actualPrice = price;
    }
    
    // Handling item counts/cart addition and removal
     const handlePriceReduction = x => {
        setItemCount(prev => ((prev-1 < 0) ? 0 : prev-1));
        handleTotalCountReduction(1);
        if(itemCount <= 0) {
            handleTotalCostReduction(0);
        } else {
            handleTotalCostReduction(x);
        }
        addToCart(gameName, actualPrice, itemCount-1);
      };
    
      const handlePriceIncrement = x => {
        setItemCount(prev => prev+1);
        handleTotalCountIncrement(1);
        handleTotalCostIncrement(x);
        addToCart(gameName, actualPrice, itemCount+1);
      };


    return (
        <div className="container">
            <section className="flexed">
                <div className="game-photo">
                    <img src={image} alt="game poster photo" />
                </div>
                <div className="game-details">
                    <h1 className="raleway-bold game-title">{gameName}</h1>
                    <h3 className="raleway-semibold game-price">₦{price}</h3>
                    <div className="counter">
                        <button onClick={() => handlePriceReduction(actualPrice)} className="raleway-semibold decrement">-</button>
                        <p className="raleway-semibold">{itemCount}</p>
                        <button onClick={() => handlePriceIncrement(actualPrice)} className="raleway-semibold increment">+</button>
                    </div>
                    <h4 className="raleway-semibold game-rating">{rating}</h4>
                    <Rating rating={rating} />
                    <h4 className="raleway-semibold game-vendor">{vendor}</h4>
                    <h5 className="raleway-regular discount">{discount && `Discount: ${discount}%`}</h5>
                    <h4 className='raleway-semibold item-cost'>{itemCount > 0 && `Cost: #${itemCount * actualPrice}`}</h4>
                </div>
            </section>
            <section className="more-details">
                <h2 className="raleway-semibold">More Details</h2>
                <p className="raleway-medium">{description}</p>
            </section>
            <section className="reviews">
                <h2 className="raleway-semibold">Reviews</h2>
                {
                    reviews.map(item => {
                        const { id, user, review } = item;
                        return (
                            <div className="review" key={id}>
                                <h3 className="raleway-semibold">{user}</h3>
                                <p className="raleway-regular">{review}</p>
                            </div>
                        )
                    })
                }
            </section>
            <Footer />
        </div>
    )
}

export default ItemDetails