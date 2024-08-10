import { RootState, AppDispatch } from "./configureStore";
import {TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()