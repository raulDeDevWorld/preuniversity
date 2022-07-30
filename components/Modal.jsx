import BlackFont from '/components/BlackFont'
import style from '../styles/Modal.module.css'
import { useState } from 'react'

export default function Progreso(props) {

    return (
        <>
            {props.mode && <div className={style.modalContainer}>
                <div className={style.blackModalContainer}>
                    <BlackFont>
                        <div className={style.blackModal}>
                            <span onClick={props.click} className={style.x}>X</span>
                            <img src="/robot.png" className={style.robot} alt="user photo" />
                            {props.children}
                        </div>
                    </BlackFont>


                </div>

            </div>}
        </>
    )
}