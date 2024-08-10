export interface IStore {
    filterCoinsText: string,
    user: {},
    userName: string | null | undefined,
    authPhoneNumber: string,
    alert: string[],
}

export interface ICart {
    name: string
    image: string
    current_price: number
    price_change_percentage_24h: number
}