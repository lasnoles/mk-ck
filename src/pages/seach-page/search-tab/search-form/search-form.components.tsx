import React from "react";
import { Layout, LayoutProperty, LayoutPropertyMap, SearchCriteria, KeyValueMap} from "../../../../redux/search-page/types/search-types";
import { connect } from 'react-redux';
import { selectSearchLayout } from '../../../../redux/search-page/layout-selector';
import { searchEntity } from '../../../../redux/search-page/search-action';
import { createStructuredSelector} from 'reselect';
import CustomButton from "../../../../component/custom-button/custom-button.component";
import './search-form.styles.scss';


interface MyProps {
    properties: LayoutPropertyMap<LayoutProperty>,
    criteria: SearchCriteria,
    layout: Layout,
    searchEntity: Function
}

interface MyState {
    criteriaValues: {[key:string]:string}
}

class SearchForm extends React.Component<MyProps, MyState> {
    constructor(props: MyProps){
        super(props);

        this.state = {
            criteriaValues: {}
        }
    }

    buildBackendUrlFromInput(baseUrl:string, criteriaValues:{[key:string]:string}) {
        let url = baseUrl + '?';
    
        for (let key in criteriaValues){
            if (criteriaValues[key] != '') {
                url += key + '=' + encodeURI(criteriaValues[key]) + '&';
                criteriaValues[key] = '';
            }
        }
        return url;
    }

    handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        const url = this.buildBackendUrlFromInput(this.props.layout.loadingUrl, this.state.criteriaValues);

        await fetch(url).then(response=>response.json())
        .then(data => this.setResultData(data));
    }

    setResultData = (data:Array<KeyValueMap<string>>) => {
        this.props.layout.resultData=data;
        this.props.searchEntity(this.props.layout);
    }


    handleChange = async (event: React.FormEvent<HTMLElement> )=>{
        let target:any = event.currentTarget;
        let keyValue = this.state.criteriaValues;
        keyValue[target.name] = target.value;
        this.setState({criteriaValues: keyValue})

        const url = this.buildBackendUrlFromInput(this.props.layout.loadingUrl, this.state.criteriaValues);

        await fetch(url).then(response=>response.json())
        .then(data => this.setResultData(data));

    }

    renderForm = (type: string, key:string, otherProps:LayoutProperty) =>{
        switch(type) {
            case 'string':
                return (
                    <div className='group'>
                    <input className='form-input' key={key} name={key} onChange={this.handleChange} />
                    {
                        otherProps.display? (
                            <label className={`${
                             typeof this.state.criteriaValues[key] !=="undefined" && this.state.criteriaValues[key].length? 'shrink':''} 
                             form-input-label`}>{otherProps.display}</label>
                         ):null
                    }
                 </div>
                )
            case 'array':
                return (
                <select key={key}>
                </select>
                )
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} method='post'>
                    {
                        this.props.criteria.fields.map((item, index)=>{
                            const {type, display} = this.props.properties[item];

                            return (
                                <div key={index}>
                                    <label className='operator'> {index===0?'':' AND '}</label>
                                    {this.renderForm(type, item, this.props.properties[item])}
                                </div>
                                
                            )

                        })
                    }
                    <CustomButton type='submit' inverted={true}>Search</CustomButton>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    layout: selectSearchLayout
});

const mapDispatchToProps = (dispatch : any)=> ({
    searchEntity: (layout:Layout) => dispatch(searchEntity(layout))
});
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);