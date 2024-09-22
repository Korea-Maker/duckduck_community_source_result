import React from 'react'
import Styles from '../styles/Contents.module.css'

function Contents({ children }) {
  return (
    <div className={Styles.contents}>
      {children}
    </div>
  )
}

export default Contents
