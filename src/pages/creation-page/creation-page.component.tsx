import  { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LayoutProperty, LayoutPropertyMap, SearchCriteria, KeyValueMap} from "../../redux/search-page/types/search-types";
import { createStructuredSelector} from 'reselect';
import { selectSearchLayout } from '../../redux/search-page/layout-selector';
import CustomButton from "../../component/custom-button/custom-button.component";
import './creation-page.styles.scss';
import ErrorMessage from "../../component/error-message/error-message.component";


interface MyProps {
    match: any,
    layout: Layout,
    initialValues: {[key:string]:LayoutProperty}
}

interface MyState {
    fieldValues: KeyValueMap<string>,
    message: string
}

class CreationPage extends Component<MyProps, MyState> {

    isNew: boolean = true;

    constructor(props: MyProps){
        super(props);

        this.isNew = typeof this.props.match.params.id==="undefined";
        console.log('the isNew is '+ this.isNew);

        this.state = {
            fieldValues: this.isNew? {}:props.layout.resultData[this.props.match.params.id],
            message: ''
        }
    }

    handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        const requestOptions = {
            method: this.isNew?'POST':'PUT',
            headers: {'Content-TYpe': 'application/json'},
            body: JSON.stringify(this.state.fieldValues)
        }
        //console.log('the body is '+ JSON.stringify(this.state.fieldValues));
        await fetch(this.props.layout.loadingUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(()=>this.setState({message: 'Result Saved Successfully.'}))
        .catch(e=>this.setState({message: e}));
    }

    handleChange = async (event: React.FormEvent<HTMLElement> )=>{
        let target:any = event.currentTarget;
        let keyValue = this.state.fieldValues;
        keyValue[target.name] = target.value;
        this.setState({fieldValues: keyValue})
    }

    renderForm = (type: string, key:string, changable: boolean, otherProps:LayoutProperty) =>{
        const value = this.state.fieldValues[key];
        switch(type) {
            case 'string':
                return (
                    <div className='group'>
                    <input className='form-input' key={key} name={key} readOnly={!this.isNew && !changable}
                    value={value} onChange={this.handleChange} />
                    {
                        otherProps.display? (
                            <label className={`${
                             typeof value !=="undefined" && this.state.fieldValues[key].length? 'shrink':''} 
                             form-input-label`}>{otherProps.display} 
                             <b>{(!changable && typeof value !=="undefined")?' [This is non-editable field]':''}</b>
                             </label>
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
    render(){
        const inputFields:LayoutPropertyMap<LayoutProperty> = this.props.layout.properties;

        return (
            <div className='creation-page'>
                <h2 className='title'>{this.isNew ? 'Create':'Update'} {this.props.layout.entityName}</h2>
                <div>
                <ErrorMessage>{this.state.message}</ErrorMessage>
                </div>
                <form onSubmit={this.handleSubmit} method='post'>
                    {
                        Object.entries(inputFields).map(
                            ([k,v], index) =>{
                             return v.isAuditField?null: (
                                <div key={index}>
                                    {this.renderForm(v.type, k, v.changable ,inputFields[k])}
                                </div>
                                
                             )
                        })
                    }
                    <CustomButton type='submit' inverted={false}>Submit</CustomButton>
                </form>
                
            </div>    
        )
    }
}

const mapStateToProps = createStructuredSelector({
    layout: selectSearchLayout
});


export default connect(mapStateToProps, null)(CreationPage);