import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAllCoinsQuery, ILineChartQuery } from "./types/IRTK";


export const api = createApi({
    reducerPath: "crypto-api",
    baseQuery: fetchBaseQuery({baseUrl: ''}), // fetchBaseQuery() - аналог fetch/axios
    tagTypes: ['coins'],

    endpoints: builder => ({

        // QUERY-ЗАПРОСЫ:

        // ЗАПРОСЫ КАРТОЧЕК
        getMainCoins: builder.query<IAllCoinsQuery, null>({   // getMainCoins - название endpoint-a. Каждый endpoint ВОЗВРАЩАЕТ ХУК, здесь это будет - useGetMainCoinsQuery()
            query: () => 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20',
            providesTags: ['coins'],
        }),
        getAllCoins: builder.query<IAllCoinsQuery, null>({   
            query: () => 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=80',
            providesTags: ['coins'],
        }),
        getOneCoinSparkline: builder.query<IAllCoinsQuery, number>({  // запрос текущей цены + процент роста + почасовая цена в неделю(sparkline) 
            query: (id) => `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=1h%2C24h%2C30d`,
            providesTags: ['coins'],
        }),
        getOneCoinLineChart: builder.query<ILineChartQuery, number>({  // запрос цен на 365 дней
            query: (id) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`,
            providesTags: ['coins'],
        }),

        // ЗАПРОС NFT
        getOurNFT: builder.query({ 
            query: ({page, limit}) => `https://eth-mainnet.g.alchemy.com/nft/v3/swQAQSNO3qTpLCnSn0OiYNsi-0GzwO6c/getNFTsForCollection?collectionSlug=cool-cats-nft&withMetadata=true&startToken=${page}&limit=${limit}`,
        }),
    })
 
}) 


export const {
    useGetMainCoinsQuery,
    useGetAllCoinsQuery,
    useGetOneCoinSparklineQuery,
    useGetOneCoinLineChartQuery,
    useGetOurNFTQuery
} = api
