import './App.css';
import SearchPage from './pages/seach-page/search-page.component';
import CreationPage from './pages/creation-page/creation-page.component';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <SearchPage />
      <Route exact path="/creation" component={CreationPage}/>
    </div>
  );
}

export default App;