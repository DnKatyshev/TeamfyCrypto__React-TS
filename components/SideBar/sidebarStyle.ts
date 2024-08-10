import { makeStyles } from "@mui/styles"
import '../../assets/MUIFonts/fonts.scss'


export const useStyle = makeStyles(() => {


    return {
        sidebar: {
            display: 'flex !important',
            flexDirection: "column !important",
            alignItems: "center !important",
            gap: "60px",
            backgroundColor: '#fff !important',
            padding: '40px !important',
            borderRadius: "14px",
        },
        sidebar__logo: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        sidebar__logo_text: {
            color: "#6956E5",
            fontSize: "22px !important", 
            fontWeight: "700 !important",
        },
        sidebar__list: {
            display: "flex",
            flexDirection: "column !important",
            gap: '40px',
        },
        sidebar__item: {
            display: "flex",
            alignItems: "center",
            gap: '20px',
            padding: "14px 22px",
            borderRadius: "6px",
            transition: "all .4s ease",
            '&:hover': {
                backgroundColor: 'rgba(227, 222, 255, .3) !important',
            }
        },
        sidebar__text: {
            color: '#878787 !important',
            fontWeight: "500 !important",
            fontSize: '20px !important',
        },

        sidebar__btn: {
            display: "flex",
            flexDirection: "column !important",
            alignItems: "center",
            gap: '50px',
        },
        signup__btn: {
            padding: "14px 30px !important",
            color: "#fff !important",
            background: "#6956E5 !important",
            fontSize: "18px",
            borderRadius: "6px",
            cursor: "pointer",
        },
        signin__btn: {
            padding: "12px 28px !important",
            color: "#6956E5 !important",
            background: "#fff !important",
            fontSize: "18px",
            border: "2px solid #6956E5 !important",
            borderRadius: "6px",
            cursor: "pointer",
        },

        signout__btn: {
            padding: "12px 28px !important",
            color: "#6956E5 !important",
            background: "#fff !important",
            fontSize: "18px",
            border: "2px solid #6956E5 !important",
            borderRadius: "6px",
            cursor: "pointer",
        },

    }
})
