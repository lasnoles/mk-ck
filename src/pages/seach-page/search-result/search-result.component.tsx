
import './search-result.styles.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectSearchLayout } from '../../../redux/search-page/layout.selector';
import { Layout, LayoutPropertyMap, LayoutProperty, KeyValueMap} from "../../../redux/search-page/types/search-types";
import { searchEntity } from '../../../redux/search-page/search-action';
import { Link } from 'react-router-dom';


interface BrokerListProps {
    layout: Layout;
    searchEntity: Function
}

interface BrokerListState {
}

class SearchResult extends Component<BrokerListProps, BrokerListState> {
    constructor(props: BrokerListProps) {
        super(props);

    }

    setResultData = (data:Array<KeyValueMap<string>>) => {
        this.props.layout.resultData=data;
        this.props.searchEntity(this.props.layout);
    }

    async componentDidMount(){
        await fetch(this.props.layout.loadingUrl).then(response=>response.json())
        .then(data => this.setResultData(data));
    }

    render(){
        let layoutProps:LayoutPropertyMap<LayoutProperty> = this.props.layout.properties;
        
        return (
        <div>
            <h2>Broker List</h2>
            <table className="styled-table">
            <thead>
            <tr>
            {
                Object.entries(layoutProps).map(([k,v]) =>
                <th key={k}>{v.display}</th>
                )
            }
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                this.props.layout.resultData.map ((broker, index) => (
                    <tr key={'key'+ broker['key']}>
                    { 
                        Object.entries(layoutProps).map(([k,v]) =>
                        <td key={k+"_"+index}>{broker[k]}</td>
                        )
                    }
                    <td>
                    <Link to='/creation'>Update</Link>
                    </td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    )}
}

const mapStateToProps = createStructuredSelector({
    layout: selectSearchLayout
});

const mapDispatchToProps = (dispatch : any)=> ({
    searchEntity: (layout:Layout) => dispatch(searchEntity(layout))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);