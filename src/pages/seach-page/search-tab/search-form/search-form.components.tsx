import React from "react";
import { Layout, LayoutProperty, LayoutPropertyMap, SearchCriteria} from "../../../../redux/search-page/types/search-types";
import FormInput from "../../../../component/form-input/form-input.component";
import CustomButton from "../../../../component/custom-button/custom-button.component";
import './search-form.styles.scss';


interface MyProps {
    properties: LayoutPropertyMap<LayoutProperty>,
    criteria: SearchCriteria
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

        console.log('the serviceurl is' + 
            this.buildBackendUrlFromInput('/TBA', this.state.criteriaValues));
    }

    handleChange = (event: React.FormEvent<HTMLElement> )=>{
        let target:any = event.currentTarget;
        let keyValue = this.state.criteriaValues;
        keyValue[target.name] = target.value;
        this.setState({criteriaValues: keyValue})
    }

    renderForm = (type: string, key:string, otherProps:LayoutProperty) =>{
        switch(type) {
            case 'string':
                return (
                    <FormInput label={otherProps.display} key={key} name={key} v={this.state.criteriaValues[key]} handleChange={this.handleChange}/>
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


export default SearchForm;