import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError(meta){
        if(meta.touched && meta.error){
            return(
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            );
        }

    }
    
    renderInput= (formProps) => {
        //console.log(formProps);
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`;
        //return <input onChange={formProps.input.onChange} value={formProps.input.value} />;
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                {/* SHORTENED SYNTAX */}
                <input {...formProps.input} autoComplete="off" /> 
                {this.renderError(formProps.meta)}
            </div>
        );
    }
    
    onSubmit = (formValues) => {
        //console.log(formValues);
        console.log(this.props);
        this.props.onSubmit(formValues);
    }
    
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
               <Field name="title" component={this.renderInput} label="Enter Title" />
               <Field name="description" component={this.renderInput} label="Enter Description" /> 
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.title){
        // only ran if the user did not enter a title
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        // only ran if the user did not enter a description
        errors.description = 'You must enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
