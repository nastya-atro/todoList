import React from 'react';
import s from './Badge.module.css'
import cn from 'classnames'

type PropsType={
    onClick?:()=>void
    colors: string
    className: string | false
}

const Badge:React.FC<PropsType>=(props)=> <i onClick={props.onClick} style={{backgroundColor: props.colors}} 
className={cn({[s.active]:props.className}, s.badge)}></i>

export default Badge