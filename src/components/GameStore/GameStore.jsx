import React from 'react'
import './GameStore.css';
import { Link } from 'react-router-dom';
import { products } from '../../consts/products';
import Rating from '../Rating';


const GameStore = () => {

  return (
    <div className="store">
        {
            products.map(item => {
                const { id, gameName, image, rating } = item;
                return (
                    <div className="product" key={id}>
                        <div className="item-img">
                            <Link to={`/product/${id}`}>
                                <img src={image} alt="game poster" />
                            </Link>
                        </div>
                        <h3 className="raleway-bold item-name">{gameName}</h3>
                        <h4 className="raleway-bold item-rating">{rating}</h4>
                        <Rating rating={rating} />
                    </div>
                )
            })
        }
    </div>
  )
}

export default GameStore