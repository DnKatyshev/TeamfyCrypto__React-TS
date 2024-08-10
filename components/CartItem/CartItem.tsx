// react-dependencies
import { FC, useState} from "react"

// redux-dependencies

// MUI-dependencies

// project-component's imports

// project's styles/img/types
import { ICartItem } from "./assets/ICartItem"
import './cartitem.scss'



export const CartItem:FC<ICartItem> = ({name, image, price, priceChange}):JSX.Element => {


    return (
        <div className="cartItem">
            <div className="cartItem__main">
                <img src={image} alt="" />
                <h2>{name}</h2>
            </div>
            <ul className="cartItem__info">
                <li>
                    <h6>Цена:</h6>
                    <p className={price > 0 ? 'cartItem--plus' : 'cartItem--minus'}>{price+'$'}</p>
                </li>
                <li>
                    <h6>Динамика за 24ч:</h6>
                    <p className={priceChange > 0 ? 'cartItem--plus' : 'cartItem--minus'}>{priceChange.toFixed(3)+'%'}</p>
                </li>
            </ul>
        </div>
    )
}

