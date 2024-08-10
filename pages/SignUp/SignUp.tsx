// react-dependencies
import { FC, useState } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
// import { persistor } from "../../store/configureStore"

// redux-dependencies
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setUser, setUserName, setAlert } from "../../store/mainSlice"

// MUI-dependencies

// project-component's imports

// project's styles/img/types
import { ISignUp } from "./types/ISignUp"
import { AlertComponent } from "../../components/Alert/Alert"
import { Loader } from "../../components/Loader/Loader"
import './signup.scss'

// FireBase
import { auth } from "../../firebase/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { db } from "../../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"



export const SignUp:FC = ():JSX.Element => {

    // Настройка Формы и Рекапчи
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors}
    } = useForm<ISignUp>({mode: 'onBlur'})

    const [recaptchaStatus, setRecaptchaStatus] = useState(false)
    const recaptchaChange = () => {
        setRecaptchaStatus(!recaptchaStatus)
    }

    //persistor.purge()  // по идее должен очищать persist-store, но нет


    const {user, userName} = useAppSelector(state => state.reducer) // показываем данные User-a
    const [createUserAlertFlag, setCreateUserAlertFlag] = useState(false) // state для отображения Alert-a при СОЗДАНИИ User-a
    const [isLoading, setLoading] = useState(false)


    // Функция для СОЗДАНИЯ корзины - при создании аккаунта => создаётся документ в FireStore под этот аккаунт. Синхронизация Auth и FireStore - через UID
    const createCart = async (email:string, uid:string) => {
        await setDoc( // ВНИМАТЕЛЬНО С ПУТЯМИ! Нужно настраивать в консоли FireStore => Rules
            doc(db, `Teamfy-Coins/${email}/Cart/${uid}`), // collection/document/subcollection/document..
            {
                email,
                cart: [] // создаём в коллекции FireStore пустую корзину + добавляем почту 
            }
        )
        console.log("Корзина создана!")
    }


    // Логика регистрации через FireBase:
    const dispatch = useAppDispatch()
    const onSubmit = (data: ISignUp) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, data.email, data.passwordConfirm)
            .then(userCredential => { // добавляем в наш User-объект доп.данные(имя) при регистрации
                updateProfile(userCredential.user, { // Обновление профиля через updateProfile асинхронно, поэтому используем 2 'then'
                    displayName: data.name
                }).then(() => {
                    dispatch(setUser(userCredential.user))  // Диспатчим в store основную инфу user-a
                    dispatch(setUserName(auth.currentUser?.displayName)) // диспатчим в store имя текущего пользователя
                    setCreateUserAlertFlag(true)
                    dispatch(setAlert(['success', 'Регистрация успешно завершена!']))
                    console.log(userCredential.user)

                    createCart(userCredential.user.email, userCredential.user.uid)
                })
            })
            .catch(error => {
                setCreateUserAlertFlag(true)
                dispatch(setAlert(['error', error]))
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
                { createUserAlertFlag && <AlertComponent/> }
                <div className="signup__main">


                    <h1 className="signup__title">Регистрация</h1>

                    <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form__group">
                            <label htmlFor="input-1" className="form__label">Имя</label>
                            <input className="form__input" id="input-1" type="text"
                                {
                                    ...register('name', {
                                        required: 'Введите ваше имя',
                                    })
                                }
                            />
                            {errors?.name && <span className="form__error">{errors?.name?.message}</span>}
                            
                        </div>
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
                                    ...register('passwordMain', {
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
                            {errors?.passwordMain && <span className="form__error">{errors?.passwordMain?.message}</span>}
                        </div>
                        <div className="form__group">
                            <label htmlFor="input-4" className="form__label">Пароль ещё раз)</label>
                            <input className="form__input" id="input-4" type="password"
                                {
                                    ...register('passwordConfirm', {
                                        required: 'Подтвердите пароль',
                                        validate: value => value === watch('passwordMain') || 'Пароли должны совпадать',
                                    })
                                }
                            />
                            {errors?.passwordConfirm && <span className="form__error">{errors?.passwordConfirm?.message}</span>}
                        </div>

                        <NavLink to='/SignUpNumber' className='authByNumber'>Регистрация по номеру</NavLink>
                        
                        <ReCAPTCHA
                            sitekey="6LcNrCAqAAAAAP_0sgtPAfaXEpyZrkfRRdKHKdWb"
                            onChange={recaptchaChange}
                            className="recaptcha"
                            style={{
                                display: "block",
                                margin: "0 auto"
                            }}
                        />

                        { isLoading && <Loader/> }

                        { <button className="form__btn btn" type="submit" disabled={!recaptchaStatus}>Вперёд!</button> }
                    </form>

                </div>
            </section>
        </motion.main>
  )
}

