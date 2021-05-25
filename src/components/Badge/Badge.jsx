import React from 'react';
import s from './Badge.module.css'
import cn from 'classnames'

const Badge=({colors, onClick, className})=> <i onClick={onClick} style={{backgroundColor: colors}} 
className={cn({[s.active]:className}, s.badge)}></i>

export default Badge