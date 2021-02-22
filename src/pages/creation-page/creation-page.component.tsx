import  { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectSearchLayout } from '../../redux/search-page/layout.selector';


class CreationPage extends Component {
    render(){
        return (
            <div>Creation Page</div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    layout: selectSearchLayout
});


export default connect(mapStateToProps, null)(CreationPage);