// redux-dependencies
import { useAppSelector } from "../../store/hooks"

// MUI-dependencies
import { Alert } from "@mui/material"



export const AlertComponent = () => {

    const {alert} = useAppSelector(state => state.reducer)


    return (
        <Alert severity={alert[0]} sx={{justifyContent: "center"}}>{alert[1]}</Alert>
    )
}
