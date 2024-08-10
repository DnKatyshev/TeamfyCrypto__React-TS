// react-dependencies
import { FC, useState } from "react";
import { motion, useScroll, useTransform } from 'framer-motion'

// Components
import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/SideBar";
import './layout.scss'

// MUI-dependencies
import { useMediaQuery } from "@mui/material";


export const Layout: FC = ({setTransitionCoinsText}): JSX.Element => {


  const [openDrawerFlag, setOpenDrawerFlag] = useState<boolean>(false)


  const { scrollYProgress } = useScroll()
  const background = useTransform(
    scrollYProgress,
    // [0.2, 0.4, 0.6, 0.8, 1],
    // ['#ffb9a6', '#f8ffa6', '#a2ff90', '#a1ebff', '#f6baff'],
    [0,1],
    ['linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', 
    'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)']
  )


  return (
    <div className="wrapper">
      <motion.span
        className="progress-line"
        style={{
            position: "fixed",
            top: 0,
            transformOrigin: 'left',
            width: "100%",
            height: "6px",
            borderRadius: "50px",
            zIndex: "100",

            scaleX: scrollYProgress,
            background,
      }}
      >
      </motion.span>
      <div className='page-main'>
          <SideBar openDrawerFlag={openDrawerFlag} setOpenDrawerFlag={setOpenDrawerFlag}/>
        <div className="page-top">
          <Header setOpenDrawerFlag={setOpenDrawerFlag} setTransitionCoinsText={setTransitionCoinsText}/>
          <Outlet/>
        </div>
      </div>

    </div>
  )
};
  