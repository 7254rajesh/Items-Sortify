import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';
import Edit from './components/Edit';
import Context from './utils/Context';

function App() {
  const { search, pathname } = useLocation();

  return (
    <Context> {/* Wrap your entire app in the Context provider */}
      <div className="h-screen w-screen flex relative bg-gray-100">
        
        {/* Home icon link */}
        {(pathname !== '/' || search.length > 0) && (
          <Link to="/" className="absolute left-[17%] top-[3%]">
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/366/438/non_2x/home-vector-icon.jpg" // Replace with your image path or URL
              alt="Home"
              className="w-8 h-8"
            />
          </Link>
        )}

        {/* Routing and Views */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </Context>
  );
}

export default App;
