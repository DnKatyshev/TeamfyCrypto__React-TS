import { makeStyles } from "@mui/styles"
import '../../assets/MUIFonts/fonts.scss'

export const useStyle = makeStyles(() => {


    return {
        header: {
            position: 'relative !important',
            backgroundColor: '#fff !important',
            padding: '40px !important',
            boxShadow: "none !important"
        },
        header__body: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        header__body_mob: {
            justifyContent: "center",
            gap: "20px"
        },
        header__p: {
            color: '#000 !important',
            fontWeight: "600 !important",
            fontSize: '20px !important',
        },
        header__list: {
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: '40px',
        },
        header__icon: {
            width: '36px !important',
            height: '36px !important',
            color: '#000 !important',
            cursor: "pointer"
        },


        searchBox: {
            
        },
        searchBtn: {
            display: "flex",
            justifyContent: "end",
            gap: '40px',
            cursor: "pointer",
        },
        searchField: {
            width: '0 !important',
            '&.active': {
                width: '200px',
            }
        },

        avatar: {
            background: 'pink !important',
            cursor: "pointer",
        },
        avatarActive: {
            background: '#ffc0cb !important',
            border: '2px solid #ff8b9e !important',
            cursor: "pointer",
        }
    }
})
