// react-dependencies
import { FC, useState, useEffect, memo } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"

// redux-dependencies
import { useGetOneCoinSparklineQuery, useGetOneCoinLineChartQuery } from "../../store/createApi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setCart, setAlert } from "../../store/mainSlice"

// MUI-dependencies
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"

// project-component's imports
import { financeCoinChart } from "../../assets/charts/financeCoinChart"
import { lineCoinChart } from "../../assets/charts/lineCoinChart"

// project's styles/img
import { Loader } from "../../components/Loader/Loader"
import './coin.scss'
import { Alert } from "@mui/material"
import { AlertComponent } from "../../components/Alert/Alert"


export const Coin:FC = ():JSX.Element => {


    const { id } = useParams()


    // 1) ЗАПРОС основной инфы + для финансового графика(sparkline, 168 часов)
    const {
        data: oneCoinMainData=[],
        isSuccess: isSuccessMain
    } = useGetOneCoinSparklineQuery(id) 
    
    
    // 2) ЗАПРОС для Line-графика(на 365 дней), пробрасываем в Функц Line-графика
    const {
        data: oneCoinLineChartData=[],
        isSuccess: isSuccessSecondary
    } = useGetOneCoinLineChartQuery(id)  
    
    // console.log('SparkDATA: ', oneCoinMainData[0]) 
    // console.log('YearDATA: ', oneCoinLineChartData) 

    useEffect(() => {
        lineCoinChart(oneCoinLineChartData.prices)
        financeCoinChart(oneCoinMainData[0])
    }, [isSuccessMain, isSuccessSecondary])


    const {user} = useAppSelector(state => state.reducer) // для disable-a кнопки, чтобы добавлять в корзину только если зарегался

    const [coinButtonFlag, setCoinButtonFlag] = useState(false) // после 1го добавления товара в корзину - всё, кнопка disabled

    const dispatch = useAppDispatch()
    const setCoinToCart = () => {
        dispatch(setAlert(['success', 'Валюта добавлена!']))
        dispatch(setCart( // добавляем в корзину товар(его данные) через action setCart, через updateDoc()
        {
            name: oneCoinMainData[0].name,
            image: oneCoinMainData[0].image,
            current_price: oneCoinMainData[0].current_price,
            price_change_percentage_24h: oneCoinMainData[0].price_change_percentage_24h,
        }))
        setCoinButtonFlag(true)
    }





    if(isSuccessMain){
        return (
            <motion.main 
                className="main"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 2, type: "spring"}}
            >
                <section className="coin">
    
                    <div className="coin__top">
                        <div className="coin__title">
                            <img src={oneCoinMainData[0].image} alt="" />
                            <h1 className="section-title">{oneCoinMainData[0].name}</h1>
                        </div>
                        {!user ? <p>Для добавления в корзину - нужна учётная запись!</p> : null}
                        {coinButtonFlag && <AlertComponent/>}
                        <button 
                            className="coin__button"
                            onClick={() => setCoinToCart()}
                            disabled={!user ? true : coinButtonFlag}
                        >
                            Добавить
                        </button>
                    </div>
    
                    <Table className="table">
                        <TableHead className="table__head">
                            <TableRow className="table__row">
                                <TableCell className="table__head-text">Цена</TableCell>
                                <TableCell className="table__head-text">Динамика за 24ч(USD)</TableCell>
                                <TableCell className="table__head-text">Динамика за 24ч(%)</TableCell>
                                <TableCell className="table__head-text">Динамика за 30д(%)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table__body">
                            <TableRow className="table__row">
                                <TableCell className='table__percent-plus'>{oneCoinMainData[0].current_price}</TableCell>
                                <TableCell className={oneCoinMainData[0].price_change_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}>{oneCoinMainData[0].price_change_24h.toFixed(4)}</TableCell>
                                <TableCell className={oneCoinMainData[0].price_change_percentage_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}>{oneCoinMainData[0].price_change_percentage_24h.toFixed(4)}</TableCell>
                                <TableCell className={oneCoinMainData[0].price_change_percentage_30d_in_currency > 0 ? 'table__percent-plus' : 'table__percent-minus'}>{oneCoinMainData[0].price_change_percentage_30d_in_currency.toFixed(4)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
    
                    <div id="line-chart"></div>
                    <div id="finance-chart"></div>
    
                </section>
            </motion.main>
        )} else {
            return <Loader/>
        }

}
