import Button from '../components/Button'
import Subtitle from '../components/Subtitle'
import { useState, useEffect } from 'react'
import PageEspecial from '../layouts/PageEspecial'
import { useUser } from '../context/Context.js'
import { playDificult } from '../firebase/utils'
import { useRouter } from 'next/router'
import { WithAuth } from '../HOCs/WithAuth'
import Error from '../components/Error'
import Success from '../components/Success'
import style from '../styles/PlayConfig.module.css'
import {rob} from '../utils/robot'
import BlackFont from '../components/BlackFont'
import PremiumC from '../components/PremiumC'



function PlayConfig() {
    const { userDB, avatar, setUserSuccess, success } = useUser()
    const [mode, setMode] = useState('suma')
    const [modeTwo, setModeTwo] = useState('multiplicacion')
    const [controller, setController] = useState(false)
    const [sumaConfig, setSumaConfig] =useState(99)
    const [restaConfig, setRestaConfig] =useState(99)
    const [multiplicacionConfig, setMultiplicacionConfig] =useState(10)
    const [divisionConfig, setDivisionConfig] =useState(10)


    const router = useRouter()



    function suma () {
        setMode('suma')
    }
    function resta () {
        setMode('resta')
    }
    function multiplicacion() {
        setModeTwo('multiplicacion')
    }
    function division() {
        setModeTwo('division')
    }


  
    function cHandler (n) {
        mode == 'suma' ? setSumaConfig(n) : setRestaConfig(n)
    }
    function clickHandler (n) {
        modeTwo == 'multiplicacion' ? setMultiplicacionConfig(n) : setDivisionConfig(n)
      
    }

    function back () {
        router.back()
    }
    function save () {
        if ( userDB.id == 'Te ha eliminado'){
            playDificult(userDB.profesor, {sumaConfig, restaConfig, multiplicacionConfig, divisionConfig })
            setUserSuccess(true)
            return 
        }
        if (userDB.id && userDB.profesor == false) {
            setUserSuccess(false)
            return
        }
        playDificult(userDB.profesor, {sumaConfig, restaConfig, multiplicacionConfig, divisionConfig })
        setUserSuccess(true)
    }

    useEffect( () => {
        userDB.sumaConfig ? setSumaConfig(userDB.sumaConfig) : ""
        userDB.restaConfig ? setRestaConfig(userDB.restaConfig) : ""
        userDB.multiplicacionConfig ? setMultiplicacionConfig(userDB.multiplicacionConfig) :''
        userDB.divisionConfig ? setDivisionConfig(userDB.divisionConfig) :''
    }, [userDB.sumaConfig, userDB.restaConfig, userDB.multiplicacionConfig, userDB.divisionConfig]);
    return (
        <PageEspecial>
            { userDB !== null && userDB !== 'loading' &&
                <div className={style.container}>
          
               
                    <span className={style.config}>Config mode</span>
                    <img src={`/robot.png`} className={style.robot} alt="user photo" />
      
                    <BlackFont> 
                        <span className={style.blueText}>Hola {userDB.aName.toUpperCase()} personaliza tu simulacro</span>
                    </BlackFont> <br />
                    <BlackFont>
                        <div className={style.mainContainerBox}>
                            <div className={style.blueText}>Tiempo</div>
                            <div className={style.containerBoxSelect}>
                                <div className={style.boxSelect}>5</div>
                                <div className={style.boxSelect}>10</div>
                                <div className={style.boxSelect}>15</div>
                                <div className={style.boxSelect}>30</div>
                                <div className={style.boxSelect}>60</div>
                            </div>
                            <div className={style.blueText}>Cantidad de preguntas</div>
                            <div className={style.containerBoxSelect}>
                                <div className={style.boxSelect}>5</div>
                                <div className={style.boxSelect}>10</div>
                                <div className={style.boxSelect}>15</div>
                                <div className={style.boxSelect}>30</div>
                                <div className={style.boxSelect}>60</div>
                            </div>
                            <div className={style.blueText}>dificultad</div>
                            <div className={style.buttonsContainer}>
                                <Button style='buttonBlackFontColorWhite'>Facil</Button>
                                <div className={style.boxSelect}>5</div>
                            </div>
                            <div className={style.buttonsContainer}>
                                <Button style='buttonBlackFontColorWhite'>Regular</Button>
                                <div className={style.boxSelect}>5</div>
                            </div>
                            <div className={style.buttonsContainer}>
                                <Button style='buttonBlackFontColorWhite'>Dificil</Button>
                                <div className={style.boxSelect}>5</div>
                            </div>
                            <div className={style.buttonsContainer}>
                                <Button style='buttonBlackFontColorWhite'>Aleatorio</Button>
                                <div className={style.boxSelect}>5</div>
                            </div>

                        </div>

                        <Button style='successButton'>Finalizar</Button>
                    </BlackFont>
                    <PremiumC></PremiumC>
                </div>
            }
        </PageEspecial>
    )
}
export default WithAuth(PlayConfig)