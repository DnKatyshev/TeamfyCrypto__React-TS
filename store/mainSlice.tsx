import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IStore, ICart } from "./types/IStore";
import { db } from "../firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";


const initialState: IStore = {
    filterCoinsText: "",

    user: {},  // Инфа про пользователя через FireBase
    userName: '',

    authPhoneNumber: '', // номер(строка) приходит из PhoneInput,
    
    alert: [],
}
 
const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,

    reducers: {
        setFilterCoinsText(state, action: PayloadAction<string>){
            state.filterCoinsText = action.payload
        },

        setUser(state, action){
            state.user = action.payload
        },
        setUserName(state, action: PayloadAction<string>){
            state.userName = action.payload
        },
        setAuthPhoneNumber(state, action: PayloadAction<string>){
            state.authPhoneNumber = '+' + action.payload
        },
        setAlert(state, action: PayloadAction<string[]>){
            state.alert = action.payload
        },

        // setDoc( db, ссылка на collection/document, кастомный ID )
        setCart(state, action: PayloadAction<ICart>){
            const ref = state.user.email ? doc(db, `Teamfy-Coins/${state.user.email}/Cart/${state.user.uid}`) : doc(db, `Teamfy-Coins/${state.user.phoneNumber}/Cart/${state.user.uid}`)
            updateDoc(
                ref, 
                {
                    cart: arrayUnion({  // arrayUnion() добавляет новые элементы в массив, сохраняя существующие элементы
                        name: action.payload.name,
                        image: action.payload.image,
                        current_price: action.payload.current_price,
                        price_change_percentage_24h: action.payload.price_change_percentage_24h,
                    })
                }
            )
        }
    }
})

// {  Такая структура записи данных в корзину
//     "cart": [
//       {
//         "name": "Product 1",
//         "image": "image_url_1",
//         "current_price": 100,
//         "price_change_percentage_24h": 5
//       },
//       {
//         "name": "Product 2",
//         "image": "image_url_2",
//         "current_price": 200,
//         "price_change_percentage_24h": 10
//       }
//     ]
// }

// createAsyncThunk - функция, для работы с async-действиями в Redux
// 1й аргумент - название action-a, 2й - сама функция

// export const setCart = createAsyncThunk( 
//     'setCart', 
//     async (payload: ICart) => {
//         return await setDoc(doc(db, 'Teamfy-Coins/Coin', payload.uid))
//       } 
// )


const {actions, reducer} = mainSlice
export const {
    setFilterCoinsText,
    setUser,
    setUserName,
    setAuthPhoneNumber,
    setAlert,
    setCart
} = actions
export default reducer;
