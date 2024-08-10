import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer from "./mainSlice";

// createApi.jsx - RTK-Query
import { api } from "./createApi";

// наш "персистированный" Store / функция для создания "персистированного" reducer-a
import {
    persistStore, persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage"; // наше хранилище(как localStorage)


const rootReduces = combineReducers({ reducer, [api.reducerPath]: api.reducer })


const persistConfig = {  // делаем persist-config
    key: 'root',
    storage,
}
const persistorReducer = persistReducer(persistConfig, rootReduces)


export const store = configureStore({

    reducer: persistorReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware),
})
export const persistor = persistStore(store)


// Делаем типизированные хуки useDispatch() / useSelector()
export type RootState = ReturnType<typeof rootReduces>  // типизация useSelector

export type AppStore = ReturnType<typeof configureStore> // типизация useDispatch
export type AppDispatch = AppStore['dispatch']