// react-dependencies
import { FC, useEffect } from "react"
import dayjs from 'dayjs'
import { motion } from "framer-motion"
import { IAllCoinsQuery } from "../../store/types/IRTK"


// redux-dependencies


// MUI-dependencies
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"


// API-edpoints-HOOK'S (RTK-Query)
import { useGetMainCoinsQuery } from "../../store/createApi"


// project-component's imports
import { barChart } from "../../assets/charts/barChart"
import { pieChart } from "../../assets/charts/pieChart"
import { lineChart } from "../../assets/charts/lineChart"


// project's styles/img
import './home.scss'
import { NavLink } from "react-router-dom"



export const Home:FC = ():JSX.Element => {

  const {
    data,
    isSuccess
  } = useGetMainCoinsQuery()
  const mainCoins:IAllCoinsQuery[] | undefined = data
  
  
  useEffect(() => {
    barChart()
    pieChart()
    lineChart()
  }, [])


  // dayjs.extend(utc);
  const currentDate = dayjs().format('DD/MM/YYYY')

  return (
    <motion.main
      className="main"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 2, type: "spring"}}
    >
      <section className="home">
        <h1 className="section-title">Главная</h1>
        <div className="home__body">

          <h1 className="home__title"><span>Teamfy</span> - это лучшая российская компания по аналитике крипто-рынка!</h1>
          <h2 className="home__subtitle">Поможем вам разобраться в бурно развивающемся crypto-мирe. Наша команда - лучшие специалисты, имеем много довольных клиентов, успешных проектов, выстреливших coin's собственной разработки! С нами - вы добьётесь своих целей!</h2>


          <div className="home__charts">

            <div className="home__bar-chart">
              <h3 className="home__charts-title">Наша команда</h3>
              <canvas id="bar"></canvas>
              <ul className="home__bar-chart-labels">

                <li className="home__bar-chart-label">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" >
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H22C24.2091 0 26 1.79086 26 4V22C26 24.2091 24.2091 26 22 26H4C1.79086 26 0 24.2091 0 22V4Z" fill="#FABE7A"/>
                    <path d="M11.67 16.18C11.19 16.18 10.788 16.092 10.464 15.916C10.14 15.736 9.894 15.5 9.726 15.208C9.562 14.912 9.48 14.588 9.48 14.236C9.48 13.908 9.538 13.62 9.654 13.372C9.77 13.124 9.942 12.914 10.17 12.742C10.398 12.566 10.678 12.424 11.01 12.316C11.298 12.232 11.624 12.158 11.988 12.094C12.352 12.03 12.734 11.97 13.134 11.914C13.538 11.858 13.938 11.802 14.334 11.746L13.878 11.998C13.886 11.49 13.778 11.114 13.554 10.87C13.334 10.622 12.954 10.498 12.414 10.498C12.074 10.498 11.762 10.578 11.478 10.738C11.194 10.894 10.996 11.154 10.884 11.518L9.714 11.158C9.874 10.602 10.178 10.16 10.626 9.832C11.078 9.504 11.678 9.34 12.426 9.34C13.006 9.34 13.51 9.44 13.938 9.64C14.37 9.836 14.686 10.148 14.886 10.576C14.99 10.788 15.054 11.012 15.078 11.248C15.102 11.484 15.114 11.738 15.114 12.01V16H14.004V14.518L14.22 14.71C13.952 15.206 13.61 15.576 13.194 15.82C12.782 16.06 12.274 16.18 11.67 16.18ZM11.892 15.154C12.248 15.154 12.554 15.092 12.81 14.968C13.066 14.84 13.272 14.678 13.428 14.482C13.584 14.286 13.686 14.082 13.734 13.87C13.802 13.678 13.84 13.462 13.848 13.222C13.86 12.982 13.866 12.79 13.866 12.646L14.274 12.796C13.878 12.856 13.518 12.91 13.194 12.958C12.87 13.006 12.576 13.054 12.312 13.102C12.052 13.146 11.82 13.2 11.616 13.264C11.444 13.324 11.29 13.396 11.154 13.48C11.022 13.564 10.916 13.666 10.836 13.786C10.76 13.906 10.722 14.052 10.722 14.224C10.722 14.392 10.764 14.548 10.848 14.692C10.932 14.832 11.06 14.944 11.232 15.028C11.404 15.112 11.624 15.154 11.892 15.154Z" fill="white"/>
                  </svg>
                  <p>Разработчики</p>
                </li>
                <li className="home__bar-chart-label">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H22C24.2091 0 26 1.79086 26 4V22C26 24.2091 24.2091 26 22 26H4C1.79086 26 0 24.2091 0 22V4Z" fill="#F6866A"/>
                  <path d="M12.882 17.18C12.262 17.18 11.742 17.03 11.322 16.73C10.902 16.426 10.584 16.016 10.368 15.5C10.152 14.984 10.044 14.402 10.044 13.754C10.044 13.106 10.15 12.524 10.362 12.008C10.578 11.492 10.894 11.086 11.31 10.79C11.73 10.49 12.246 10.34 12.858 10.34C13.466 10.34 13.99 10.49 14.43 10.79C14.874 11.086 15.216 11.492 15.456 12.008C15.696 12.52 15.816 13.102 15.816 13.754C15.816 14.402 15.696 14.986 15.456 15.506C15.22 16.022 14.882 16.43 14.442 16.73C14.006 17.03 13.486 17.18 12.882 17.18ZM9.834 17V8.36H11.094V12.338H10.95V17H9.834ZM12.708 16.046C13.108 16.046 13.438 15.944 13.698 15.74C13.962 15.536 14.158 15.262 14.286 14.918C14.418 14.57 14.484 14.182 14.484 13.754C14.484 13.33 14.418 12.946 14.286 12.602C14.158 12.258 13.96 11.984 13.692 11.78C13.424 11.576 13.082 11.474 12.666 11.474C12.274 11.474 11.95 11.57 11.694 11.762C11.442 11.954 11.254 12.222 11.13 12.566C11.01 12.91 10.95 13.306 10.95 13.754C10.95 14.202 11.01 14.598 11.13 14.942C11.25 15.286 11.44 15.556 11.7 15.752C11.96 15.948 12.296 16.046 12.708 16.046Z" fill="white"/>
                </svg>
                  <p>Aналитики</p>
                </li>
                <li className="home__bar-chart-label">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H22C24.2091 0 26 1.79086 26 4V22C26 24.2091 24.2091 26 22 26H4C1.79086 26 0 24.2091 0 22V4Z" fill="#59E6F6"/>
                  <path d="M12.612 16.18C11.948 16.18 11.384 16.032 10.92 15.736C10.456 15.44 10.1 15.034 9.852 14.518C9.608 14.002 9.484 13.416 9.48 12.76C9.484 12.092 9.612 11.502 9.864 10.99C10.116 10.474 10.476 10.07 10.944 9.778C11.412 9.486 11.974 9.34 12.63 9.34C13.338 9.34 13.942 9.516 14.442 9.868C14.946 10.22 15.278 10.702 15.438 11.314L14.19 11.674C14.066 11.31 13.862 11.028 13.578 10.828C13.298 10.624 12.976 10.522 12.612 10.522C12.2 10.522 11.862 10.62 11.598 10.816C11.334 11.008 11.138 11.272 11.01 11.608C10.882 11.944 10.816 12.328 10.812 12.76C10.816 13.428 10.968 13.968 11.268 14.38C11.572 14.792 12.02 14.998 12.612 14.998C13.016 14.998 13.342 14.906 13.59 14.722C13.842 14.534 14.034 14.266 14.166 13.918L15.438 14.218C15.226 14.85 14.876 15.336 14.388 15.676C13.9 16.012 13.308 16.18 12.612 16.18Z" fill="white"/>
                </svg>
                  <p>Маркетологи</p>
                </li>
                <li className="home__bar-chart-label">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H22C24.2091 0 26 1.79086 26 4V22C26 24.2091 24.2091 26 22 26H4C1.79086 26 0 24.2091 0 22V4Z" fill="#7661E2"/>
                  <path d="M12.414 17.18C11.81 17.18 11.288 17.03 10.848 16.73C10.412 16.43 10.074 16.022 9.834 15.506C9.598 14.986 9.48 14.402 9.48 13.754C9.48 13.102 9.6 12.52 9.84 12.008C10.08 11.492 10.42 11.086 10.86 10.79C11.304 10.49 11.83 10.34 12.438 10.34C13.05 10.34 13.564 10.49 13.98 10.79C14.4 11.086 14.716 11.492 14.928 12.008C15.144 12.524 15.252 13.106 15.252 13.754C15.252 14.402 15.144 14.984 14.928 15.5C14.712 16.016 14.394 16.426 13.974 16.73C13.554 17.03 13.034 17.18 12.414 17.18ZM12.588 16.046C13 16.046 13.336 15.948 13.596 15.752C13.856 15.556 14.046 15.286 14.166 14.942C14.286 14.598 14.346 14.202 14.346 13.754C14.346 13.306 14.284 12.91 14.16 12.566C14.04 12.222 13.852 11.954 13.596 11.762C13.344 11.57 13.022 11.474 12.63 11.474C12.214 11.474 11.872 11.576 11.604 11.78C11.336 11.984 11.136 12.258 11.004 12.602C10.876 12.946 10.812 13.33 10.812 13.754C10.812 14.182 10.876 14.57 11.004 14.918C11.136 15.262 11.332 15.536 11.592 15.74C11.856 15.944 12.188 16.046 12.588 16.046ZM14.346 17V12.338H14.202V8.36H15.462V17H14.346Z" fill="white"/>
                </svg>

                  <p>HR</p>
                </li>

              </ul>
            </div>

            <div className="home__pie-chart">
              <h3 className="home__charts-title">Проекты в работе<span>{currentDate.toLocaleString()}</span></h3>
              <div className="home__pie-chart-container">
                <ul className="home__pie-chart-labels">
                  <li className="home__pie-chart-label">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="4.9999" cy="5" r="5" fill="#6956E5"/>
                    </svg>
                    <p>Крипто-кошельки</p>
                  </li>
                  <li className="home__pie-chart-label">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="4.9999" cy="5" r="5" fill="#FB896B"/>
                    </svg>
                    <p>Прогнозы / инсайды</p>
                  </li>
                  <li className="home__pie-chart-label">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="4.9999" cy="5" r="5" fill="#F8C07F"/>
                    </svg>
                    <p>Крипто-обменники</p>
                  </li>
                  <li className="home__pie-chart-label">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="4.9999" cy="5" r="5" fill="#67FF56"/>
                    </svg>
                    <p>IT-продукты</p>
                  </li>
                </ul>
                <canvas id="pie"></canvas>
              </div>
            </div>

            <div className="home__line-chart">
              <h3 className="home__charts-title">Рост крипто-рынка (триллионы $):</h3>
              <canvas id="line"></canvas>
            </div>
          </div>


          <div className="home__table">
            <h1 className="home__table-title">Топ продаж</h1>
            <Table className="table">
              <TableHead className="table__head">
                <TableRow>
                  <TableCell className="table__head-text">Валюта</TableCell>
                  <TableCell className="table__head-text">Цена $</TableCell>
                  <TableCell className="table__head-text">Рост за 24ч %</TableCell>
                  <TableCell className="table__head-text">Капитализация за 24ч %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table__body">
                {
                   mainCoins && mainCoins.map(coin => {
                      return (
                        <TableRow key={coin.id} className="table__row">
                            <NavLink to={`/coin/${coin.id}`} className='table__link'>
                              <TableCell className="table__coin-name">
                                <img src={coin.image} alt="" />
                                {coin.name}
                              </TableCell>
                            </NavLink>
                              <TableCell className="table__price">{coin.current_price.toFixed(2)}</TableCell>
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
                    })
                 }
              </TableBody>
            </Table>
          </div>

        </div>
      </section>
    </motion.main>
  )
}
