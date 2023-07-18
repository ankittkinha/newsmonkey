
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

    return (
      <BrowserRouter>
          <Navbar />
          <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
          <Routes>
            <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key={"general"} pageSize={pageSize} country="in" category="general" />} ></Route>
            <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key={"business"} pageSize={pageSize} country="in" category="business" />} ></Route>
            <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key={"entertainment"} pageSize={pageSize} country="in" category="entertainment" />} ></Route>
            <Route path='/health'  element={<News setProgress={setProgress} apiKey={apiKey} key={"health"} pageSize={pageSize} country="in" category="health" />} ></Route>
            <Route path='/science'  element={<News setProgress={setProgress} apiKey={apiKey} key={"science"} pageSize={pageSize} country="in" category="science" />} ></Route>
            <Route path='/sports'  element={<News setProgress={setProgress} apiKey={apiKey} key={"sports"} pageSize={pageSize} country="in" category="sports" />} ></Route>
            <Route path='/technology'  element={<News setProgress={setProgress} apiKey={apiKey} key={"technology"} pageSize={pageSize} country="in" category="technology" />} ></Route>
          </Routes>
          
      </BrowserRouter>

    )

}

export default App;


