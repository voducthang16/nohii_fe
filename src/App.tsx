import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Log from './Log';

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/log' element={<Log />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;