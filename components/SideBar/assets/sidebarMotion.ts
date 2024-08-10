export const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: {
            staggerChildren: .3,
            delayChildren: .7,
        }
    }
}
export const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1 ,
        transition: {
            duration: .3,
        }
    }
}