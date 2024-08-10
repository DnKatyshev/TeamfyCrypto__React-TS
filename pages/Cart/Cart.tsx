// react-dependencies
import { FC, useState, useEffect} from "react"
import { motion } from "framer-motion"
import QRCode from "react-qr-code";

// redux-dependencies
import { useAppSelector } from "../../store/hooks"

// MUI-dependencies

// project-component's imports

// project's styles/img
import { CartItem } from "../../components/CartItem/CartItem"
import { AlertComponent } from "../../components/Alert/Alert";
import './cart.scss'

// FireBase
import { db } from "../../firebase/firebase"
import { doc, getDoc } from "firebase/firestore"



export const Cart:FC = ():JSX.Element => {


    const {user} = useAppSelector(state => state.reducer) // общие данные user-a
    const [cartArray, setCartArray] = useState() // добавляем данные из FireStore-корзины в State и проходимся через .map

    useEffect(() => {
        const ref = user.email ? doc(db, `Teamfy-Coins/${user.email}/Cart/${user.uid}`) : doc(db, `Teamfy-Coins/${user.phoneNumber}/Cart/${user.uid}`)

        getDoc(ref)
            .then((data) => setCartArray(data._document.data.value.mapValue.fields.cart.arrayValue.values))
    }, [])



    return (
        <motion.main
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="cart">
                <h1 className="section-title">Корзина</h1>
                <div className="cart__body">
                        {
                            
                            cartArray

                                        ?

                        <div className="cart__main">

                            {                            
                                cartArray.map((cartItem) => {
                                    const cartDataRef = cartItem.mapValue.fields
                                return (
                                    <div className="cart__items">
                                            <CartItem 
                                                name={cartDataRef.name.stringValue} 
                                                image={cartDataRef.image.stringValue} 
                                                price={cartDataRef.current_price.doubleValue} 
                                                priceChange={cartDataRef.price_change_percentage_24h.doubleValue} 
                                            />
                                        </div>
                                ) 
                                })
                            
                            }
                            <div className="qr-code">
                                <h2>Отсканируйте QR-код для связи с разработчиком</h2>
                                <QRCode 
                                    value="https://t.me/Sokyl"
                                    size={256}
                                />
                            </div>

                        </div>
                                            :
                                
                        <h2 className="cart--empty">Корзина пуста. Зарегистрируйтесь и добавьте монеты!</h2>
                        }
                </div>
            </section>
        </motion.main>
    )
}

