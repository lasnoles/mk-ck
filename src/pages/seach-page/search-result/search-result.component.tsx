
import './search-result.styles.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectSearchLayout } from '../../../redux/search-page/layout-selector';
import { Layout, LayoutPropertyMap, LayoutProperty, KeyValueMap} from "../../../redux/search-page/types/search-types";
import { searchEntity } from '../../../redux/search-page/search-action';
import RouteButton from '../../../component/route-button/route-button.component';
import { Add } from "@material-ui/icons";


interface EntityListProps {
    layout: Layout;
    searchEntity: Function
}

interface EntityListState {
}

class SearchResult extends Component<EntityListProps, EntityListState> {

    constructor(props: EntityListProps) {
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
            <div className='table-label'>{this.props.layout.entityName} List </div>
           <div className='options'> 
                <RouteButton url='/entity/creation'> 
                    <Add/> 
                </RouteButton>
           </div>
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
                this.props.layout.resultData.map ((entity, index) => (
                    <tr key={'key'+ entity['key']}>
                    { 
                        Object.entries(layoutProps).map(([k,v]) =>
                        <td key={k+"_"+index}>{entity[k]}</td>
                        )
                    }
                    <td>
                    <RouteButton url={'/entity/view/'+index} > VIEW </RouteButton>
                    <RouteButton url={'/entity/creation/'+index} > UPDATE </RouteButton>
                    <RouteButton url={this.props.layout.loadingUrl} method='delete' data={entity} > DELETE </RouteButton>
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