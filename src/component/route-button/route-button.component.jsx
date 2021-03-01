import './route-button.styles.scss';
import {useHistory} from 'react-router-dom';

const RouteButton = ({children, url, ...otherProps}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: url
        });
    }

    const fetchWithMethod = () => {
        fetch(url, {
            method: otherProps['method'],
            body: otherProps['data'],
        }).then(response=> console.log(response.json()));
    }

    return (
        otherProps['method']? 
        <button className='route-button inverted' onClick={fetchWithMethod} {...otherProps}>
            {children}
        </button>
        :
        <button className='route-button inverted' onClick={handleClick} {...otherProps}>
            {children}
        </button>
    )
}

export default RouteButton;