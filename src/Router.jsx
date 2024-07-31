import { Route,Routes } from 'react-router';
import Customers from './Cutomers'
import App from './App'
const Main=()=>{
    return(

        <>
        <Routes>
            <Route path='/' element={<App/>}> </Route>
            <Route path="/customers" element={<Customers/>}>

            </Route>
        </Routes>
        </>
    )
}
export default Main;