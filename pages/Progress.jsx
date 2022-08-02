import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Success from '../components/Success'
import Error from '../components/Error'
import { getAllBank } from '../firebase/utils'
import PageUserLayout from '../layouts/PageUserLayout'
import { CircularProgressBar } from '@tomik23/react-circular-progress-bar';
import style from '../styles/Progress.module.css'
import Button from '../components/Button'
import ProgressC from '../components/ProgressC'
import Modal from '../components/Modal'
import { useState, useEffect } from 'react'





function Progress() {
    const { user, userDB, id, setTeacherId, setUserSuccess, success, bank, setUserBank } = useUser()
    // const [mode, setMode] = useState(false)
    // array de progresos
    const [progress, setProgress] = useState(null)

    // summing up progress
    function getProgressData(arrProgressUserDB) {

        const dataProgress = arrProgressUserDB.reduce((mainObject, mainItem) => {
            const newObject = {}

            const mainItemValue = Object.values(mainItem[1].progress).reduce((obj, item) => {
                const newObj = {
                    faciles: item.difficulty == 'F' ? obj.faciles + 1 : obj.faciles,
                    regulares: item.difficulty == 'R' ? obj.regulares + 1 : obj.regulares,
                    dificiles: item.difficulty == 'D' ? obj.dificiles + 1 : obj.dificiles,
                    indefinidos: item.difficulty == false ? obj.indefinidos + 1 : obj.indefinidos,
                }
                return { ...obj, ...newObj }

            }, { faciles: 0, regulares: 0, dificiles: 0, indefinidos: 0, })

            newObject[mainItem[0]] = mainItemValue
            return { ...mainObject, ...newObject }

        }, {})
        // summary of progress in object
        setProgress(dataProgress)

    }

    function getSpecificProgress(req) {
        const data = Object.values(progress).reduce((obj, item) => {
            const newObj = {
                specificCount: obj.specificCount + item[req],
                headCount: obj.headCount + item.faciles + item.regulares + item.dificiles + item.indefinidos
            }
            return { ...obj, ...newObj }
        }, { specificCount: 0, headCount: 0 })
        return data
    }


    function getAllBankLength() {
        if (bank) {
            const bankLength = Object.values(bank).reduce((num, item) => {
                const newNum = item.length + num
                return newNum
            }, 0)
            return bankLength
        } else {
            return 1
        }

    }

    useEffect(() => {
        if (userDB.subjects != null && userDB.subjects != undefined) {
            // array de progresos
            const arrProgressUserDB = Object.entries(userDB.subjects)
            getProgressData(arrProgressUserDB)
            getAllBank(userDB.university, userDB.subjects, bank, setUserBank)
        }
    }, [userDB]);
    console.log(bank)
    return (
        <PageUserLayout>
            {userDB !== null && userDB !== 'loading' &&
                <div className={style.container}>

                    <div className={style.presentation}>
                        <span>Monitorea tus progresos</span>
                        <img src={`/robot.png`} className={style.robot} alt="user photo" />
                    </div>



                    <div>
                        <CircularProgressBar
                            colorCircle="#365b74"
                            fontColor="#00F0FF"
                            size={150}
                            fontSize="20px"
                            unit="%"
                            linearGradient={[
                                '#8ff8ff',
                                '#00F0FF',
                            ]}
                            percent={progress != null && bank != null ? Math.round(getSpecificProgress('dificiles').specificCount * 100 / getAllBankLength()) : 0}
                            round
                        />
                        <div>
                            Faciles:
                            <span></span>
                        </div>
                        <span>Faciles: {progress != null ? getSpecificProgress('dificiles').specificCount : 0} <br /> </span>
                    </div>





                    <div>

                    </div>
                </div>

            }


        </PageUserLayout>
    )
}

export default WithAuth(Progress)





















 {/* {userDB !== null && userDB !== 'loading' && 
            <>
            <div className={style.container}>
                <img src={`/robot.png`} className={style.robot} alt="user photo" />
                <div>
                    <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Hola,': 'hola,'}  {`${userDB.name.split(' ')[0].toUpperCase()}`}</span> 
                    <span className={style.subtitle}>Monitorea tus progresos desde aqui</span>
                </div>
            
                    <div className={style.gridContainer}> */}
                    {/* {userDB.id ? <span className={`${style.subtitle} ${style.left} `}>Prof. Id: <span className={style.orange}>{userDB.id}</span></span> : <span className={style.subtitle}>Comparte tus progresos con tu profe.</span>}<br/> */}
                    {/* <div className={style.grid}> */}
                        
                            {/* {Object.keys(userDB.subjects).map((m, i) =>)} */}

                               
                          
                     
                                
                               
                       


                            
{/*                    
                    
                        </div>
                    </div>                   
          

                <div className={style.buttons}>                
                    <Button style='buttonSecondary' click={backClick}>Atras</Button><Button style='buttonPrimary' click={x}>{userDB.id ? 'Cambiar Prof. Id' : 'Compartir progreso'}</Button>
                </div>



            </div> 
 
          
            </>} */}
   
    {/* <Modal mode={mode} click={x} text={`Ingresa el Id de tu profe...`}>
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
    {success ==false && <Error>Error</Error>} */}

