import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks.tsx';
import { setFilterCoinsText } from '../../store/mainSlice.tsx'

import { useStyle } from './headerStyle.ts'
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';



export const SearchInput = ({setTransitionCoinsText}) => {

    const dispatch = useAppDispatch()
    const [searchText, setSearchText] = useSearchParams()
    const filterText = (text:string) => {
        setTransitionCoinsText( () => dispatch(setFilterCoinsText(text)) )
        setSearchText(text)
    }

    const classes = useStyle()

    const [searchFlag, setSearchFlag] = useState(false)
    const searchRef = useRef()
    const changeSearchFlag = () => {
        setSearchFlag(() => !searchFlag)
        searchRef.current.focus()
    }
    

  return (
    <Box>
        <IconButton onClick={changeSearchFlag} className={classes.searchBtn}>
            <SearchIcon className={classes.header__icon}/>
        </IconButton>
        
        <input
            placeholder="Поиск…"
            className={searchFlag ? classes.searchField.active : classes.searchField}
            ref={searchRef}
            style={{
                'borderBottom': "2px solid #ffc9c9cc", 
                'padding': "6px 0",
                'color': "2px solid #ffc9c9cc",
                'letterSpacing': ".8px",
                'transition': "all 0.4s ease-in",
            }}
            onInput={(e) => filterText(e.target.value)}
        />
    </Box>
  )
}
