// React-dependencies
import { useTransition } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Redux-dependencies
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configureStore';

// Pages
import { Home } from './pages/Home/Home';
import { Coins } from './pages/Coins/Coins';
import { Coin } from './pages/Coin/Coin';
import { NFT } from './pages/NFT/NFT';
import { SignUp } from './pages/SignUp/SignUp';
import { SignIn } from './pages/SignIn/SignIn';
import { SignUpNumber } from './pages/SignUp/SignUpNumber';
import { SignInNumber } from './pages/SignIn/SignInNumber';
import { Cart } from './pages/Cart/Cart';

// Components
import { Layout } from './components/Layout';




const App = () => {


  const [transitionCoinsText, setTransitionCoinsText] = useTransition()


  const router = createBrowserRouter(createRoutesFromElements(

    <Route
      path='/'
      element={<Layout setTransitionCoinsText={setTransitionCoinsText}/>}
    >
      <Route 
        index
        element={<Home/>}
      />
      <Route 
        path='coins'
        element={<Coins transitionCoinsText={transitionCoinsText}/>}
      />
      <Route 
        path='coin/:id'
        element={<Coin/>}
      />
      <Route 
        path='NFT'
        element={<NFT/>}
      />


      <Route 
        path='/SignUp'
        element={<SignUp/>}
      />
      <Route 
        path='/SignIn'
        element={<SignIn/>}
      />


      <Route 
        path='/SignUpNumber'
        element={<SignUpNumber/>}
      />
      <Route 
        path='/SignInNumber'
        element={<SignInNumber/>}
      />

      <Route 
        path='/cart'
        element={<Cart/>}
      />
      

    </Route>
    
    ))
  
    return (
      <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <AnimatePresence mode='wait'>
              <RouterProvider router={router} />
            </AnimatePresence>
          </PersistGate>
      </Provider>
    )
}

export default App