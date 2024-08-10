// react-dependencies
import { FC, useState} from "react"
import { motion } from "framer-motion"
import axios from 'axios'

// redux-dependencies
import { useGetOurNFTQuery } from "../../store/createApi"

// MUI-dependencies
import {Table, TableBody, TableRow, TableCell, Pagination} from "@mui/material"

// project-component's imports

// project's styles/img
import { Loader } from "../../components/Loader/Loader"
import './nft.scss'



export const NFT:FC = ():JSX.Element => {

    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)

    const {
        data,
        isFetching,
        isSuccess
    } = useGetOurNFTQuery({page, limit})
    console.log(data)




    return (
        <motion.main 
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="nfts">
                <h1 className="section-title">NFT's нашей собственной разработки</h1>

                <div className="nfts__body">
                    <Table className="nfts__table">
                        <TableBody>
                            {
                                data && data.nfts.map((nft) => {
                                    return (                                   
                                        <TableRow
                                            className="nfts__table-row"
                                            key={nft.tokenId}
                                        >
                                            <TableCell className="nfts__table-cell">{nft.tokenId})</TableCell>
                                            {
                                                !isFetching
                                                                    ? 
                                                <TableCell className="nfts__table-cell"><img src={nft.image.cachedUrl} alt="" /></TableCell>
                                                                    :
                                                <Loader size={50}/>
                                            }  
                                            <TableCell className="nfts__table-cell">{nft.name}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>

                    <Pagination
                        count={10}
                        color="secondary"
                        shape="rounded"
                        onChange={(event, value) => {
                            setPage(value*10)
                        }}
                    />
                </div>
            </section>
        </motion.main>
    )
}

