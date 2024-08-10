// react-dependencies
import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// redux-dependencies
import { useAppSelector } from "../../store/hooks"

// MUI-dependencies
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Drawer, IconButton, Badge, useMediaQuery } from "@mui/material"

import { useStyle } from './headerStyle.ts'

// project's styles/img
import './headerStyle.ts'
import './assets/header.scss'
import { SearchInput } from './SearchInput.tsx';
import { IHeader } from './assets/IHeader.ts'

// FireBase
import { db } from "../../firebase/firebase"
import { doc, getDoc } from "firebase/firestore"



export const Header:FC <IHeader> = ({setOpenDrawerFlag, openDrawerFlag, setTransitionCoinsText}):JSX.Element => {

  const location = useLocation()

  const classes = useStyle()
  const matches = useMediaQuery('(min-width:991px)'); // стилизация

  const [headerDrawer, setHeaderDrawer] = useState(false)

  const {user, userName} = useAppSelector(state => state.reducer) // state-ы из Store-a


  // ДЛЯ BADGE-a, чтобы считать кол-во в FireStore корзине
  const [badgeCartValue, setBadgeCartValue] = useState()
  useEffect(() => {
    const ref = user.email ? doc(db, `Teamfy-Coins/${user.email}/Cart/${user.uid}`) : doc(db, `Teamfy-Coins/${user.phoneNumber}/Cart/${user.uid}`)
    getDoc(ref).then((data) => setBadgeCartValue(data._document.data.value.mapValue.fields.cart.arrayValue.values))
  }) 


  return (
    <AppBar className={classes.header}>
        <Grid container className={matches ? classes.header__body : classes.header__body_mob}>
        {
          !matches 
                  ? 
        <Box sx={{display: "flex", alignItems: 'center', gap: "15px"}}>
            <IconButton onClick={() => setOpenDrawerFlag(!openDrawerFlag)}>
              <svg width="48px" height="48px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#6956E5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#6956E5" d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
              ></path></g></svg>
            </IconButton>
              <Typography className={classes.header__p}>
                Hey, {userName ? userName : "Guest"}!
              </Typography>
        </Box>
                  :
          <Typography className={classes.header__p}>
            Hey, {userName ? userName : "Guest"}!
          </Typography>
          }
          <Grid item className={classes.header__list}>
            {location.pathname == '/coins' ? <SearchInput setTransitionCoinsText={setTransitionCoinsText} /> : null}

            <NavLink to='/cart'>
              <Badge badgeContent={badgeCartValue && badgeCartValue.length} color='primary'>
                <ShoppingBagOutlinedIcon className={classes.header__icon} />
              </Badge>
            </NavLink>

            <Avatar className={userName ? classes.avatarActive : classes.avatar}
              onClick={() => setHeaderDrawer(!headerDrawer)}
            >
              {userName ? userName.split('')[0] : 'G'}
            </Avatar>
          </Grid>
        </Grid>

        <Drawer
          anchor="right"
          open={headerDrawer}
          onClose={() => setHeaderDrawer(!headerDrawer)}
        >
          <div className="account">
            <h3 className='account__title'>Ваш аккаунт</h3>

            <ul className="account__info">
              <li className="account__info-item">
                <h4>Имя:</h4>
                <p>{userName ? userName : "Guest"}</p>
              </li>
              <li className="account__info-item">
                <h4>Почта / номер:</h4>
                <p>{user.email ? user.email : user.phoneNumber ? user.phoneNumber : "—"}</p>
              </li>
              <li className="account__info-item">
                <h4>User ID:</h4>
                <p>{user ? user?.uid : "—"}</p>
              </li>
            </ul>

          </div>
        </Drawer>

    </AppBar>
  )
}
