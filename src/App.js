import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './components/routes/home/home';
import Navigation from './components/routes/home/navigation/navigation';
import SignIn from './components/routes/sign-in/sign-in.component';

const Shop = ()=>{
  return <h1> Hello from shop </h1>
}

const App = () => {
  return (
  <Routes>
    <Route path='/' element={<Navigation />}>
      <Route index element={<Home />}/>
      <Route path='shop' element={<Shop />}/>
      <Route path='sign-in' element={<SignIn />}/>
    </Route>
  </Routes>
  
  )
}

export default App;
