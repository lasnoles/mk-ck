import './search-tab.styles.scss';

import React from "react";
import { connect } from 'react-redux';
import { selectSearchLayout } from '../../../redux/search-page/layout.selector';
import { createStructuredSelector} from 'reselect';
import { Layout } from "../../../redux/search-page/types/search-types";
import SearchForm from "./search-form/search-form.components";

interface MyProps {
    layout: Layout
}

interface MyState {
    activeLabel: string
}


class SearchTab extends React.Component<MyProps, MyState>{
    constructor(props: MyProps){
        super(props);

        this.state = {
            activeLabel: props.layout.searchCriterias[0].label
        }
    }

    handleChange = (event: React.FormEvent<HTMLElement>) => {
        let target: any = event.target;
        this.setState({activeLabel: target.value})
    }

    render(){
        return (
            <div className='search-header'>
                <div className='search-tab'>
                {
                    this.props.layout.searchCriterias.map((criteria)=>(
                        <button className={`${(this.state.activeLabel === criteria.label)?'active':''}`}
                            key={criteria.label} value={criteria.label} onClick={this.handleChange}>{criteria.label}</button>
                    ))
                }
                </div>
                {
                    this.props.layout.searchCriterias.map((criteria)=>(
                        <div key={criteria.label}>
                            <SearchForm key={criteria.label} criteria={criteria} properties={this.props.layout.properties}/>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    layout: selectSearchLayout
});

export default connect(mapStateToProps)(SearchTab);