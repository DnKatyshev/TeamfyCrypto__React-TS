import React from "react";

export interface ISideBar {
    openDrawerFlag: boolean,
    setOpenDrawerFlag: () => React.Dispatch<React.SetStateAction<boolean>>,
}