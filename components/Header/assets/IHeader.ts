export interface IHeader {
    openDrawerFlag: boolean,
    setOpenDrawerFlag: () => React.Dispatch<React.SetStateAction<boolean>>,
    setTransitionCoinsText: () => void
}