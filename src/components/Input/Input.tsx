import React, { InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.scss'
import bindClass from 'classnames/bind'

const cx = bindClass.bind(styles)
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fieldClassName?: String,
    error?: string
}
const Input = forwardRef<HTMLInputElement, InputProps>(({ fieldClassName, error, ...props }, ref) => {

    return (
        <div className={cx("input-field", { [`${fieldClassName}`]: fieldClassName, error: error })}>
            <input {...props} ref={ref} />
            <div className={cx("feedback")}>{error}</div>
        </div>
    )

})
export default Input
