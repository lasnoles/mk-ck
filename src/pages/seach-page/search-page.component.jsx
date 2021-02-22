import './search-page.styles.scss';

import SearchTab from './search-tab/search-tab.component';
import SearchResult from './search-result/search-result.component';

const SearchPage = () =>  (
    <div className='search-page'>
        <SearchTab />
        <SearchResult />
    </div>
)

export default SearchPage;