import React from 'react'
import styles from "./Components.module.scss"
interface Props{
    label:string;
    handleRedirect:()=>void
}
const Backbtn = ({label,handleRedirect}:Props) => {

  return (
      <button className={styles.backBtn}>
          <i
            className="fa fa-arrow-left"
            onClick={handleRedirect}
          ></i>
          <span className="ms-3">{label}</span>
        </button>
  )
}

export default Backbtn
