import { React } from "react";

import './error-message.styles.scss';

const ErrorMessage = ({children}) => (
    <label className='error-msg'>{children}</label>
)

export default ErrorMessage;