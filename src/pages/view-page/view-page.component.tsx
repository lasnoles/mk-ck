import  { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LayoutProperty, LayoutPropertyMap, KeyValueMap} from "../../redux/search-page/types/search-types";
import { createStructuredSelector} from 'reselect';
import { selectSearchLayout } from '../../redux/search-page/layout-selector';
import RouteButton from '../../component/route-button/route-button.component';
import './view-page.styles.scss';


interface MyProps {
    match: any,
    layout: Layout,
    initialValues: {[key:string]:LayoutProperty}
}

interface MyState {
    fieldValues: KeyValueMap<string>,
}

class ViewPage extends Component<MyProps, MyState> {
    constructor(props: MyProps){
        super(props);

        this.state = {
            fieldValues: props.layout.resultData[this.props.match.params.id],
        }

        console.log('the field valus is ' + JSON.stringify(this.state.fieldValues));
    }

    renderForm = (type: string, key:string, otherProps:LayoutProperty) =>{
        const value = this.state.fieldValues[key];
        switch(type) {
            case 'string':
                return (
                    <div className='view-groups'>
                    {
                        otherProps.display? (
                            <label className='view-input-label'>{otherProps.display} </label>
                         ):null
                    }
                    <input className='view-input' key={key} name={key} readOnly
                    value={value} />
                 </div>
                )
            case 'array':
                return (
                <select key={key}>
                </select>
                )
        }
    }
    render(){
        const inputFields:LayoutPropertyMap<LayoutProperty> = this.props.layout.properties;

        return (
            <div className='view-page'>
                <h2 className='title'>View {this.props.layout.entityName}</h2>
                <RouteButton url={'/entity/creation/'+this.props.match.params.id} > UPDATE </RouteButton>
                <RouteButton url={this.props.layout.loadingUrl} method='delete' 
                      data={this.props.layout.resultData[this.props.match.params.id]} > DELETE </RouteButton>
            {
                Object.entries(inputFields).map(
                    ([k,v], index) =>{
                        return v.isAuditField?null: (
                        <div key={index}>
                            {this.renderForm(v.type, k, inputFields[k])}
                        </div>
                        
                        )
                })
            }
            </div>    
        )
    }
}

const mapStateToProps = createStructuredSelector({
    layout: selectSearchLayout
});


export default connect(mapStateToProps, null)(ViewPage);