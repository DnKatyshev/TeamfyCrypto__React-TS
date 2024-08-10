// react-dependencies
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { IAllCoinsQuery } from "../../store/types/IRTK"


// redux-dependencies
import { useGetAllCoinsQuery } from "../../store/createApi"
import { useAppSelector } from "../../store/hooks"


// MUI-dependencies
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"


// API-edpoints-HOOK'S (RTK-Query)


// project-component's imports


// project's styles/img
import { Loader } from "../../components/Loader/Loader"
import './coins.scss'


export const Coins:FC = ({transitionCoinsText}):JSX.Element => {


    const {
        data,
        isFetching,
        isSuccess
    } = useGetAllCoinsQuery()
    const allCoinsData:IAllCoinsQuery[] | undefined = data

    const {filterCoinsText} = useAppSelector(state => state.reducer)

    return(
        <motion.main className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="coins">
                <h1 className="section-title">Все валюты</h1>
                <h2 className="coins__subtitle">Все криптовалюты, с которыми наша компания производит транзакции!</h2>

                <div className="coins__table">
                    <Table className="table">
                    <TableHead className="table__head">
                        <TableRow>
                            <TableCell className="table__head-text">№</TableCell>
                            <TableCell className="table__head-text">Валюта</TableCell>
                            <TableCell className="table__head-text">Цена $</TableCell>
                            <TableCell className="table__head-text">Рост за 24ч $</TableCell>
                            <TableCell className="table__head-text">Рост за 24ч %</TableCell>
                            <TableCell className="table__head-text">Капитализация за 24ч %</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        isFetching 
                                    ? 
                        <Loader/>
                                    :                       
                        transitionCoinsText

                                    ?
                        <Loader/>
                                    :
                        <TableBody className="table__body">
                            {
                            allCoinsData && allCoinsData.map((coin, index) => {
                                if(!filterCoinsText){
                                    return (
                                        <TableRow key={coin.id} className="table__row">
                                            <TableCell className="table__price">{index+1}</TableCell>
                                            <NavLink to={`/coin/${coin.id}`} className='table__link'>
                                                <TableCell className="table__coin-name">
                                                    <img src={coin.image} alt="" />
                                                    {coin.name}
                                                </TableCell>
                                            </NavLink>
                                            <TableCell className="table__price">{coin.current_price.toFixed(2)}</TableCell>
                                            <TableCell 
                                                className={coin.price_change_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}
                                            >
                                                {coin.price_change_24h.toFixed(2)}
                                            </TableCell>
                                            <TableCell 
                                                className={coin.price_change_percentage_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}
                                            >
                                                {coin.price_change_percentage_24h.toFixed(3)}
                                            </TableCell>
                                            <TableCell
                                                className={coin.price_change_percentage_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}
                                            >
                                                {coin.market_cap_change_percentage_24h.toFixed(3)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    if(coin.name.toLowerCase().includes(filterCoinsText.toLowerCase())){
                                        return (
                                            <TableRow key={coin.id} className="table__row">
                                                <TableCell className="table__price">{index+1}</TableCell>
                                                <NavLink to={`/coin/${coin.id}`} className='table__link'>
                                                    <TableCell className="table__coin-name">
                                                        <img src={coin.image} alt="" />
                                                        {coin.name}
                                                    </TableCell>
                                                </NavLink>
                                                <TableCell className="table__price">{coin.current_price.toFixed(2)}</TableCell>
                                                <TableCell 
                                                    className={coin.price_change_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}
                                                >
                                                    {coin.price_change_24h.toFixed(2)}
                                                </TableCell>
                                                <TableCell 
                                                    className={coin.price_change_percentage_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}
                                                >
                                                    {coin.price_change_percentage_24h.toFixed(3)}
                                                </TableCell>
                                                <TableCell
                                                    className={coin.price_change_percentage_24h > 0 ? 'table__percent-plus' : 'table__percent-minus'}
                                                >
                                                    {coin.market_cap_change_percentage_24h.toFixed(3)}
                                                </TableCell>
                                            </TableRow>
                                        )                                       
                                    }
                                }
                                })
                            }
                        </TableBody>
                    }
                    </Table>
                </div>

            </section>
        </motion.main>
    )
}
