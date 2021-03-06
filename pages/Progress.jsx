import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import Error from '../components/Error'
import PageEspecial from '../layouts/PageEspecial'
import { getIds, query } from '../firebase/utils'
import style from '../styles/Progress.module.css'
import Button from '../components/Button'
import ProgressC from '../components/ProgressC'
import Modal from '../components/Modal'
import { useState, useEffect } from 'react'

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import RadialSeparators from '../components/RadialSeparators'
import ChangingProgressProvider from "../components/ChangingProgressProvider";








function Progress() {
    const { user, userDB, id, setTeacherId, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState(false)
    const [alert, setAlert] = useState(false)
    const [idConfig, setIdConfig] = useState(null)


    const router = useRouter()

    function x () {
        setMode(!mode)
    }
    function y () {
        setAlert(!alert)
    }
    function nextClick (e) {
        e.preventDefault()
        const idInput = e.target.form[0].value
        setIdConfig(idInput)
        query(idInput, setTeacherId, user.uid, userDB.aName, setUserSuccess, setAlert)
    }
    function sureClick (e) {
        e.preventDefault()
        getIds(idConfig, setTeacherId, user.uid, userDB.aName, setUserSuccess, true)
        setAlert(false)
    }
    function backClick (e) {
        e.preventDefault()
        router.back()
    }
    console.log(userDB.id)
    useEffect(() => {
        success == true ? x() : ''
    }, [success, alert]);
    return (
       
   <PageEspecial>
        {userDB !== null && userDB !== 'loading' && 
            <>
            <div className={style.container}>
                <img src={`/robot.png`} className={style.robot} alt="user photo" />
                <div>
                    <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Hola,': 'hola,'}  {`${userDB.name.split(' ')[0].toUpperCase()}`}</span> 
                    <span className={style.subtitle}>Monitorea tus progresos desde aqui</span>
                </div>
            
                    <div className={style.gridContainer}>
                    {/* {userDB.id ? <span className={`${style.subtitle} ${style.left} `}>Prof. Id: <span className={style.orange}>{userDB.id}</span></span> : <span className={style.subtitle}>Comparte tus progresos con tu profe.</span>}<br/> */}
                    <div className={style.grid}>
                        
                            {/* {Object.keys(userDB.subjects).map((m, i) =>)} */}

                               
                          
                     
                                    <CircularProgressbarWithChildren
                                        value={80}
                                        text={`${80}%`}
                                        strokeWidth={10}
                                        styles={buildStyles({
                                            strokeLinecap: "butt"
                                        })}
                                    >
                                        <RadialSeparators
                                            count={12}
                                            style={{
                                                background: "white",
                                                width: "2px",
                                                // This needs to be equal to props.strokeWidth
                                                height: `${10}%`
                                            }}
                                        />
                                    </CircularProgressbarWithChildren>
                                    <ChangingProgressProvider values={[0, 80]}>
                                        {(percentage) => (
                                            <CircularProgressbar
                                                value={percentage}
                                                text={`${percentage}%`}
                                                styles={buildStyles({
                                                    pathTransition:
                                                        percentage === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s"
                                                })}
                                            />
                                        )}
                                    </ChangingProgressProvider>
                               
                       


                            
                   
                    
                        </div>
                    </div>                   
          

                <div className={style.buttons}>                
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={x}>{userDB.id ? 'Cambiar Prof. Id' : 'Compartir progreso'}</Button>
                </div>



            </div> 
 
          
            </>}
   
    <Modal mode={mode} click={x} text={`Ingresa el Id de tu profe...`}>
    <form className={style.form}>      
        <input className={style.modalInput} type="text" placeholder='alex73447725' />
        <button className={style.modalButton} onClick={nextClick}>ok</button>
    </form>
    </Modal>
    <Modal mode={alert} click={y} text={`Este Id esta preconfigurado para RESETEAR todos tus progresos...`}>
    <span className={style.black}>Id: <span className={style.black}>{idConfig}</span></span>
    <form className={style.form}>      
        <button className={style.modalButton} onClick={sureClick}>Continuar</button>
    </form>
    </Modal>
    {success ==true && <Success>Correcto</Success>}
    {success ==false && <Error>Error</Error>}
    </PageEspecial>
    )
}

export default WithAuth(Progress)
