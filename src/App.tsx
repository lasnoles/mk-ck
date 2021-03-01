import './App.scss';

import React from 'react';
import SearchPage from './pages/seach-page/search-page.component';
import CreationPage from './pages/creation-page/creation-page.component';
import ViewPage from './pages/view-page/view-page.component';
import ReportPage from './pages/report-page/report-page.component';
import Header from './component/header/header.component';
import { Route} from 'react-router';

const App = ()=>(
  <div className="App">
    <Header/>
    <Route exact path="/entity" component={SearchPage}/>
    <Route exact path="/entity/creation/:id" component={CreationPage}/>
    <Route exact path="/entity/view/:id" component={ViewPage}/>
    <Route exact path="/entity/creation" component={CreationPage}/>
    <Route exact path="/reports" component={ReportPage}/>
  </div>
)

export default App;