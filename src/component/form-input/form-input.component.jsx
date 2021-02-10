import React from 'react';

import './form-input.styles.scss';

const FormInput = ({handleChange, label, v, ...otherProps}) => 
(
    <div className='group'>
       <input className='form-input' onChange={handleChange} {...otherProps} />
       {
           label? (
               <label className={`${
                typeof v !=="undefined" && v.length? 'shrink':''} 
                form-input-label`}>{label}</label>
            ):null
       }
    </div>
)

export default FormInput;