// react-dependencies
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { motion } from 'framer-motion'

// redux-dependencies
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { setUser, setUserName } from "../../store/mainSlice"

// MUI-dependencies
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import { useMediaQuery } from "@mui/material"

// project's styles/img
import logo from './resource/logo.svg'
import { useStyle } from "./sidebarStyle"
import { listVariants, itemVariants } from "./assets/sidebarMotion"
import { ISideBar } from "./assets/ISideBar"

// FireBase
import { auth } from "../../firebase/firebase"
import { signOut } from "firebase/auth"



export const SideBar:FC<ISideBar> = ({setOpenDrawerFlag, openDrawerFlag}):JSX.Element => {

    const matches = useMediaQuery('(min-width:991px)');

    const classes = useStyle()


    // FireBase:

    // 1) Alert / кнопки
    const {user} = useAppSelector(state => state.reducer)



    // 2) Логика выхода из аккаунта через FireBase
    const dispatch = useAppDispatch()
    const letSignOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setUser(''))
                dispatch(setUserName('Guest'))
            })
            .catch((error) => {

            });
    }


    return (

        matches 
        
            ?

        <Box className={classes.sidebar}>
            <motion.Box className={classes.sidebar__logo}
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{ duration: .5, type: 'spring' }}
            >
                <img src={logo} alt="" />
                <Typography className={classes.sidebar__logo_text}>Teamify</Typography>
            </motion.Box>
            <motion.List className={classes.sidebar__list} variants={listVariants} initial={'hidden'} animate={'visible'}>
                <motion.ListItem variants={itemVariants} >
                    <NavLink to='/' className={classes.sidebar__item}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M10 3.5H3V10.5H10V3.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 3.5H14V10.5H21V3.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 14.5H14V21.5H21V14.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 14.5H3V21.5H10V14.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Главная</ListItemText>
                    </NavLink>
                </motion.ListItem>
                <motion.ListItem variants={itemVariants}>
                    <NavLink to='/coins' className={classes.sidebar__item}>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
                            <path d="M12.4375 0.5H13.125H17.25H17.9375V1.1875V16.3125V17H17.25H13.125H12.4375V16.3125V1.1875V0.5ZM13.8125 1.875V15.625H16.5625V1.875H13.8125ZM0.0625 4.625H0.75H4.875H5.5625V5.3125V16.3125V17H4.875H0.75H0.0625V16.3125V5.3125V4.625ZM1.4375 6V15.625H4.1875V6H1.4375ZM6.25 8.75H6.9375H11.0625H11.75V9.4375V16.3125V17H11.0625H6.9375H6.25V16.3125V9.4375V8.75ZM7.625 10.125V15.625H10.375V10.125H7.625Z" fill="#202224"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Криптовалюты</ListItemText>
                    </NavLink>
                </motion.ListItem>
                <motion.ListItem variants={itemVariants}>
                    <NavLink to='/cart' className={classes.sidebar__item}>
                        <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
                            <path d="M18.207 0.015625L18.7227 2.9375H17.3047L17.0898 1.60547L9.3125 2.9375H1.14844L18.207 0.015625ZM0.375 3.625H1.0625H2.09375H18.9375H19.625V4.3125V13.9375V14.625H18.9375H1.0625H0.375V13.9375V5.34375V4.3125V3.625ZM3.76953 5C3.79818 5.14323 3.8125 5.25781 3.8125 5.34375C3.8125 5.83073 3.64062 6.24609 3.29688 6.58984C2.98177 6.90495 2.58073 7.0625 2.09375 7.0625C2.00781 7.0625 1.89323 7.04818 1.75 7.01953V11.2305C1.89323 11.2018 2.00781 11.1875 2.09375 11.1875C2.58073 11.1875 2.98177 11.3594 3.29688 11.7031C3.64062 12.0182 3.8125 12.4193 3.8125 12.9062C3.8125 12.9922 3.79818 13.1068 3.76953 13.25H16.2305C16.2018 13.1068 16.1875 12.9922 16.1875 12.9062C16.1875 12.4193 16.3451 12.0182 16.6602 11.7031C17.0039 11.3594 17.4193 11.1875 17.9062 11.1875C17.9922 11.1875 18.1068 11.2018 18.25 11.2305V7.01953C18.1068 7.04818 17.9922 7.0625 17.9062 7.0625C17.4193 7.0625 17.0039 6.90495 16.6602 6.58984C16.3451 6.24609 16.1875 5.83073 16.1875 5.34375C16.1875 5.25781 16.2018 5.14323 16.2305 5H3.76953ZM7.55078 6.71875C8.23828 6.03125 9.05469 5.6875 10 5.6875C10.9453 5.6875 11.7474 6.03125 12.4062 6.71875C13.0938 7.3776 13.4375 8.17969 13.4375 9.125C13.4375 10.0703 13.0938 10.8867 12.4062 11.5742C11.7474 12.2331 10.9453 12.5625 10 12.5625C9.05469 12.5625 8.23828 12.2331 7.55078 11.5742C6.89193 10.8867 6.5625 10.0703 6.5625 9.125C6.5625 8.17969 6.89193 7.3776 7.55078 6.71875ZM11.4609 7.66406C11.0599 7.26302 10.5729 7.0625 10 7.0625C9.42708 7.0625 8.9401 7.26302 8.53906 7.66406C8.13802 8.0651 7.9375 8.55208 7.9375 9.125C7.9375 9.69792 8.13802 10.1849 8.53906 10.5859C8.9401 10.987 9.42708 11.1875 10 11.1875C10.5729 11.1875 11.0599 10.987 11.4609 10.5859C11.862 10.1849 12.0625 9.69792 12.0625 9.125C12.0625 8.55208 11.862 8.0651 11.4609 7.66406Z" fill="#202224"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Корзина</ListItemText>
                    </NavLink>
                </motion.ListItem>
                <motion.ListItem variants={itemVariants}>
                    <NavLink to='/NFT' className={classes.sidebar__item}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M17 21.5V19.5C17 18.4391 16.5786 17.4217 15.8284 16.6716C15.0783 15.9214 14.0609 15.5 13 15.5H5C3.93913 15.5 2.92172 15.9214 2.17157 16.6716C1.42143 17.4217 1 18.4391 1 19.5V21.5" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 11.5C11.2091 11.5 13 9.70914 13 7.5C13 5.29086 11.2091 3.5 9 3.5C6.79086 3.5 5 5.29086 5 7.5C5 9.70914 6.79086 11.5 9 11.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23 21.5V19.5C22.9993 18.6137 22.7044 17.7528 22.1614 17.0523C21.6184 16.3519 20.8581 15.8516 20 15.63" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.63C16.8604 3.85031 17.623 4.35071 18.1676 5.05232C18.7122 5.75392 19.0078 6.61683 19.0078 7.505C19.0078 8.39318 18.7122 9.25608 18.1676 9.95769C17.623 10.6593 16.8604 11.1597 16 11.38" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Наши NFT</ListItemText>
                    </NavLink>
                </motion.ListItem>
            </motion.List>

            <Divider />

            {
                !user
                
                        ?


                <Box className={classes.sidebar__btn}>
                    <NavLink to='/SignUp'>
                            <motion.Typography
                                className={classes.signup__btn}
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{ duration: .5, type: 'spring', delay: 1.9 }}
                            >
                                Регистрация
                            </motion.Typography>
                    </NavLink>

                    <NavLink to='/SignIn'>
                        <motion.Typography
                            className={classes.signin__btn}
                            style={{color: '#6956E5'}}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{ duration: .5, type: 'spring', delay: 2.2 }}
                        >
                            Войти
                        </motion.Typography>
                    </NavLink>
                </Box>

                        :

                <motion.Button 
                        className={classes.signout__btn}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{ duration: .5, type: 'spring', delay: 2 }}
                        onClick={() => letSignOut()}
                >
                    Выйти
                </motion.Button>
            }

        </Box>

            :

        <Drawer
            anchor="left"
            open={openDrawerFlag}
            onClose={() => setOpenDrawerFlag(!openDrawerFlag)}
        >
            <Box className={classes.sidebar}>
            <Box className={classes.sidebar__logo}>
                <img src={logo} alt="" />
                <Typography className={classes.sidebar__logo_text}>Teamify</Typography>
            </Box>
            <List className={classes.sidebar__list}>
                <NavLink to='/'>
                    <ListItem className={classes.sidebar__item}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M10 3.5H3V10.5H10V3.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 3.5H14V10.5H21V3.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 14.5H14V21.5H21V14.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 14.5H3V21.5H10V14.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Главная</ListItemText>
                    </ListItem>
                </NavLink>
                <NavLink to='/coins'>
                    <ListItem className={classes.sidebar__item}>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
                            <path d="M12.4375 0.5H13.125H17.25H17.9375V1.1875V16.3125V17H17.25H13.125H12.4375V16.3125V1.1875V0.5ZM13.8125 1.875V15.625H16.5625V1.875H13.8125ZM0.0625 4.625H0.75H4.875H5.5625V5.3125V16.3125V17H4.875H0.75H0.0625V16.3125V5.3125V4.625ZM1.4375 6V15.625H4.1875V6H1.4375ZM6.25 8.75H6.9375H11.0625H11.75V9.4375V16.3125V17H11.0625H6.9375H6.25V16.3125V9.4375V8.75ZM7.625 10.125V15.625H10.375V10.125H7.625Z" fill="#202224"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Криптовалюты</ListItemText>
                    </ListItem>
                </NavLink>
                <NavLink to='/cart'>
                    <ListItem className={classes.sidebar__item}>
                        <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
                            <path d="M18.207 0.015625L18.7227 2.9375H17.3047L17.0898 1.60547L9.3125 2.9375H1.14844L18.207 0.015625ZM0.375 3.625H1.0625H2.09375H18.9375H19.625V4.3125V13.9375V14.625H18.9375H1.0625H0.375V13.9375V5.34375V4.3125V3.625ZM3.76953 5C3.79818 5.14323 3.8125 5.25781 3.8125 5.34375C3.8125 5.83073 3.64062 6.24609 3.29688 6.58984C2.98177 6.90495 2.58073 7.0625 2.09375 7.0625C2.00781 7.0625 1.89323 7.04818 1.75 7.01953V11.2305C1.89323 11.2018 2.00781 11.1875 2.09375 11.1875C2.58073 11.1875 2.98177 11.3594 3.29688 11.7031C3.64062 12.0182 3.8125 12.4193 3.8125 12.9062C3.8125 12.9922 3.79818 13.1068 3.76953 13.25H16.2305C16.2018 13.1068 16.1875 12.9922 16.1875 12.9062C16.1875 12.4193 16.3451 12.0182 16.6602 11.7031C17.0039 11.3594 17.4193 11.1875 17.9062 11.1875C17.9922 11.1875 18.1068 11.2018 18.25 11.2305V7.01953C18.1068 7.04818 17.9922 7.0625 17.9062 7.0625C17.4193 7.0625 17.0039 6.90495 16.6602 6.58984C16.3451 6.24609 16.1875 5.83073 16.1875 5.34375C16.1875 5.25781 16.2018 5.14323 16.2305 5H3.76953ZM7.55078 6.71875C8.23828 6.03125 9.05469 5.6875 10 5.6875C10.9453 5.6875 11.7474 6.03125 12.4062 6.71875C13.0938 7.3776 13.4375 8.17969 13.4375 9.125C13.4375 10.0703 13.0938 10.8867 12.4062 11.5742C11.7474 12.2331 10.9453 12.5625 10 12.5625C9.05469 12.5625 8.23828 12.2331 7.55078 11.5742C6.89193 10.8867 6.5625 10.0703 6.5625 9.125C6.5625 8.17969 6.89193 7.3776 7.55078 6.71875ZM11.4609 7.66406C11.0599 7.26302 10.5729 7.0625 10 7.0625C9.42708 7.0625 8.9401 7.26302 8.53906 7.66406C8.13802 8.0651 7.9375 8.55208 7.9375 9.125C7.9375 9.69792 8.13802 10.1849 8.53906 10.5859C8.9401 10.987 9.42708 11.1875 10 11.1875C10.5729 11.1875 11.0599 10.987 11.4609 10.5859C11.862 10.1849 12.0625 9.69792 12.0625 9.125C12.0625 8.55208 11.862 8.0651 11.4609 7.66406Z" fill="#202224"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>Корзина</ListItemText>
                    </ListItem>
                </NavLink>
                <NavLink to='/NFT'>
                    <ListItem className={classes.sidebar__item}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M17 21.5V19.5C17 18.4391 16.5786 17.4217 15.8284 16.6716C15.0783 15.9214 14.0609 15.5 13 15.5H5C3.93913 15.5 2.92172 15.9214 2.17157 16.6716C1.42143 17.4217 1 18.4391 1 19.5V21.5" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 11.5C11.2091 11.5 13 9.70914 13 7.5C13 5.29086 11.2091 3.5 9 3.5C6.79086 3.5 5 5.29086 5 7.5C5 9.70914 6.79086 11.5 9 11.5Z" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23 21.5V19.5C22.9993 18.6137 22.7044 17.7528 22.1614 17.0523C21.6184 16.3519 20.8581 15.8516 20 15.63" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.63C16.8604 3.85031 17.623 4.35071 18.1676 5.05232C18.7122 5.75392 19.0078 6.61683 19.0078 7.505C19.0078 8.39318 18.7122 9.25608 18.1676 9.95769C17.623 10.6593 16.8604 11.1597 16 11.38" stroke="#202224" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <ListItemText className={classes.sidebar__text}>NFT</ListItemText>
                    </ListItem>
                </NavLink>
            </List>

            <Divider />

            {
                !user
                
                        ?

                <Box className={classes.sidebar__btn}>
                    <NavLink to='/SignUp'>
                            <motion.Typography
                                className={classes.signup__btn}
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{ duration: .5, type: 'spring', delay: 1.9 }}
                            >
                                Регистрация
                            </motion.Typography>
                    </NavLink>

                    <NavLink to='/SignIn'>
                        <motion.Typography
                            className={classes.signin__btn}
                            style={{color: '#6956E5'}}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{ duration: .5, type: 'spring', delay: 2.2 }}
                        >
                            Войти
                        </motion.Typography>
                    </NavLink>
                </Box>

                        :

                <motion.Button 
                        className={classes.signout__btn}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{ duration: .5, type: 'spring', delay: 2 }}
                        onClick={letSignOut}
                >
                    Выйти
                </motion.Button>
            }

            </Box>
        </Drawer>
        
    )
}
