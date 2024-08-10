// react-dependencies
import { FC, useState } from "react"
import { motion } from "framer-motion"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'react-otp-input';
import { useForm } from "react-hook-form";

// redux-dependencies
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setUser, setUserName, setAuthPhoneNumber, setAlert } from "../../store/mainSlice";

// MUI-dependencies

// project-component's imports

// project's styles/img/types
import { AlertComponent } from "../../components/Alert/Alert";
import './signup.scss'

// FireBase
import { signInWithPhoneNumber, RecaptchaVerifier, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase"
import { db } from "../../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"



export const SignUpNumber:FC = ():JSX.Element => {

    // в этой форме будет только name
    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm()

    // метод signInWithPhoneNumber() может использоваться для входа в существующую учетную запись или для создания новой учетной записи, если она не существует. Когда вы вызываете этот метод с новым номером телефона, Firebase автоматически создает новую учетную запись и сохраняет ее в консоли Firebase


    const [otpValue, setOtpValue] = useState<string>(''); // нужно для OTP(one-time-password)-инпута
    const [phoneAlertFlag, setPhoneAlertFlag] = useState(false) // state для отображения Alert-a при ОТПРАВКЕ КОДА
    const [confirmationResult, setConfirmationResult] = useState() // STATE ДЛЯ ЗАПИСИ метода из signInWithPhoneNumber.then((confirmationResult)
    const [formName, setFormName] = useState()


    const {authPhoneNumber, userName} = useAppSelector(state => state.reducer)
    const dispatch = useAppDispatch()


    // Функция для СОЗДАНИЯ корзины - при создании аккаунта => создаётся документ в FireStore под этот аккаунт. Синхронизация Auth и FireStore - через UID
    const createCart = async (phoneNumber:string, uid:string) => {
        await setDoc( // ВНИМАТЕЛЬНО С ПУТЯМИ! Нужно настраивать в консоли FireStore => Rules
            doc(db, `Teamfy-Coins/${phoneNumber}/Cart/${uid}`), // collection/document/subcollection/document..
            {
                phoneNumber,
                cart: [] // создаём в коллекции FireStore пустую корзину + добавляем почту 
            }
        )
        console.log("Корзина создана!")
    }


    const goSendPhoneCode = (data) => {

        // Проверка инициализации auth и номера телефона
        if (!auth || !authPhoneNumber) {
            setPhoneAlertFlag(true)
            dispatch(setAlert(['error', 'Аутентификации не установлена или не указан номер телефона']));
            return;
        }

        const appVerifier = new RecaptchaVerifier(auth, 'phone-recapcha', {  // это invisible-рекапча
            'size': 'invisible',
            'callback': (response) => {
                console.log('reCAPTCHA решена', response);
            },
            'expired-callback': () => {
                console.log('reCAPTCHA истекла');
            }
        });

        // Отладочная информация
        console.log('reCAPTCHA инициализирована');

        // Если номер новый - в FireBase-консоли будет создаваться аккаунт, как через createUser(), если старый - будет логика "входа"
        signInWithPhoneNumber(auth, authPhoneNumber, appVerifier) // *и номер, и код МОГУТ БЫТЬ СТРОКАМИ
            .then((confirmationResult) => {
                setConfirmationResult(confirmationResult) // записываем 'confirmationResult' в отдельный State для использ. во 2й функции
                setPhoneAlertFlag(true)
                dispatch(setAlert(['success', 'Код отправлен!']))

                setFormName(data.name)
            })
            .catch((error) => {
                setPhoneAlertFlag(true)
                dispatch(setAlert(['error', 'Код не отправлен(']))
                console.log('Код не отправлен(', error)
            })

    }

    const goVerifyOtp = () => {
        const code = otpValue
        confirmationResult.confirm(code) // метод confirmationResult.confirm(code) используется для подтверждения кода, возвращает Promise, резолв которого возвращает инфу о пользователе
            .then((userCredential) => { //возвращает ту же инфу о User-e что и при регистрации по почте/паролю
                dispatch(setUser(userCredential.user))
                dispatch(setUserName(formName))
                setPhoneAlertFlag(true)
                dispatch(setAlert(['success', 'Код подтверждён!']))
                console.log(userName)

                createCart(userCredential.user.phoneNumber, userCredential.user.uid)
            })
            .catch((error) => {
                setPhoneAlertFlag(true)
                dispatch(setAlert(['error', 'Код не отправлен(']))
                console.log('Код не отправлен(', error)
            })
    }

    console.log(authPhoneNumber)

    
    // Если существует confirmationResult - показываем OTP-Input, если нет - Форму
    return (
        <motion.main
            className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="signup">
                <div className="signup__main">

                {phoneAlertFlag && <AlertComponent/>}

                <h1 className="signup__title">Регистрация по номеру</h1>

                {
                    !confirmationResult 
                    
                            ?

                    <form id="form" className="form" method="post" onSubmit={handleSubmit(goSendPhoneCode)}>
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
                            <label className="form__label">Номер</label>
                            <PhoneInput
                                country={'ru'}
                                value={authPhoneNumber}
                                onChange={(text:string) => dispatch(setAuthPhoneNumber(text))}
                                containerClass="phone-container"
                                inputClass="phone-input"
                            />
                            <div id="phone-recapcha"></div>
                        </div>

                        <button className="form__btn btn" type="submit">Вперёд!</button>
                    </form>

                            :

                    <div className="signup-number__item">
                        <h1 className="signup__title-number">Введите одноразовый код</h1>
                        <OtpInput
                            value={otpValue}
                            onChange={setOtpValue}
                            numInputs={6}
                            renderSeparator={<span>•</span>}
                            renderInput={(props) => <input {...props} />}
                            containerStyle='otp-container'
                            inputStyle='otp-input'
                        />
                        <button className="form__btn btn" onClick={() => goVerifyOtp()}>Вперёд!</button>
                    </div>
                }



                </div>
            </section>
        </motion.main>
    )
}
