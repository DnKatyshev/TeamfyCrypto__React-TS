// react-dependencies
import { FC, useState } from "react"
import { motion } from "framer-motion"
import { useForm } from 'react-hook-form'

// redux-dependencies
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setUser, setUserName, setAlert } from "../../store/mainSlice"

// MUI-dependencies

// project-component's imports

// project's styles/img/types
import { ISignIn } from "./types/ISignIn"
import { AlertComponent } from "../../components/Alert/Alert"
import { Loader } from "../../components/Loader/Loader"

// FireBase
import { auth } from "../../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"



export const SignIn:FC = ():JSX.Element => {


    // Настройка Формы и Рекапчи
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm<ISignIn>({mode: 'onBlur'})


    const {user} = useAppSelector(state => state.reducer) // общие данные user-a
    const [signUserAlertFlag, setSignUserAlertFlag] = useState(false) // state для отображения Alert-a при ВХОДЕ User-a
    const [isLoading, setLoading] = useState(false)
    

    // Логика регистрации через FireBase:
    const dispatch = useAppDispatch()
    const onSubmit = (data: ISignIn) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, data.email, data.password) // при успешном входе - возвращает объект User-a, если нет - то ничего
            .then(user => {
                dispatch(setUser(user.user))  // Диспатчим в store основную инфу user-a
                dispatch(setUserName(auth.currentUser?.displayName)) // диспатчим в store имя текущего пользователя, ТУТ БЕЗ updateProfile() - при входе через signIn() displayName уже есть в объекте
                setSignUserAlertFlag(true)
                dispatch(setAlert(['success', 'Вы вошли!']))
                console.log(user)
            })
            .catch(error => {
                setSignUserAlertFlag(true)
                dispatch(setAlert(['error', 'Вход не удался']))
                console.log(error)
            })
            .finally(() => setLoading(false))


        reset()
    }


    return (
        <motion.main
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="signup">
                { signUserAlertFlag && <AlertComponent/> }
                <div className="signup__main">


                    <h1 className="signup__title">Вход</h1>

                    <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form__group">
                            <label htmlFor="input-2" className="form__label">Почта</label>
                            <input className="form__input" id="input-2" type="email"
                                {
                                    ...register('email', {
                                        required: 'Введите корректный email',
                                        pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                                    })
                                }
                            />
                            {errors?.email && <span className="form__error">{errors?.email?.message}</span>}
                        </div>


                        <div className="form__group">
                            <label htmlFor="input-3" className="form__label">Пароль</label>
                            <input className="form__input" id="input-3" type="password" placeholder="(Латиница, 1 заглавная буква, минимум 6 символов)"
                                {
                                    ...register('password', {
                                        required: 'Введите пароль',
                                        minLength: {
                                            value: 6,
                                            message: 'Минимум 6 символов'
                                        },
                                        pattern: {
                                            value: /[A-Z]/,
                                            message: 'Нужна одна заглавная буква)'
                                        }
                                    })
                                }
                            />
                            {errors?.password && <span className="form__error">{errors?.password?.message}</span>}
                        </div>
          
                        {isLoading && <Loader/>}

                        <button className="form__btn btn" type="submit">Вперёд!</button>
                    </form>

                </div>
            </section>
        </motion.main>
  )
}

