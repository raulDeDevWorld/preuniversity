
import { useState, useEffect } from 'react'
import { useUser } from '../../../context/Context.js'
import { setProgress, setErrors, userDataUpdate, getEspecificData } from '../../../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../../../components/Error'
import Timer from '../../../components/Timer'
import BlackFont from '../../../components/BlackFont'
import PageEspecial from '../../../layouts/PageEspecial'
import { WithAuth } from '../../../HOCs/WithAuth'
import style from '../../../styles/Result.module.css'


import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";


// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css'
// import RadialSeparators from '../../../components/RadialSeparators'
// import ChangingProgressProvider from "../../../components/ChangingProgressProvider";


function Simulacro() {
    const { userDB, setUserSuccess, success, setUserData, simulacro, setUserSimulacro, bank, setUserBank, } = useUser()
    const [select, setSelect] = useState(null)
    const [points, setPoints] = useState(null)
    const [array, setArray] = useState(['a', 'b', 'c', 'd'])

    const router = useRouter()

    function back() {
        router.query.Index > 1
            ? router.back()
            : ''
        setSelect(null)
    }
    function next() {
        router.query.Index < simulacro.length
            ? router.push(`/Simulacro/${router.query.Simulacro}/${parseInt(router.query.Index) + 1}`)
            : ''
        setSelect(null)
    }
    function finish() {
        router.push(`/Simulacro/${router.query.Simulacro}/Result`)
    }
    function nav(i) {

        router.push(`/Simulacro/${router.query.Simulacro}/${parseInt(i) + 1}`)

        setSelect(null)
    }

    //    console.log(simulacro)

    function revision() {
        const data = simulacro.reduce((object, item) => {
            if (item.userAnswer == undefined) {
                const newObject = { undefined: object.undefined + 1 }
                return { ...object, ...newObject }
            }
            const newObject = item.respuesta === item.userAnswer ? { success: object.success + 1 } : { mistakes: object.mistakes + 1 }
            return { ...object, ...newObject }
        }, { success: 0, mistakes: 0, undefined: 0 })
        setPoints(data)
    }
    // simulacro && router.query.Index? console.log(array) : ''
    // simulacro && router.query.Index? console.log(simulacro[router.query.Index-1]) : ''

    console.log(points)
    useEffect(() => {
        simulacro !== null ? revision() : ''
    }, []);
    return (
        <PageEspecial>
            {userDB !== 'loading' &&
                <div className={style.container}>
                    <div>
                        <img src={`/robot.png`} className={style.perfil} alt="user photo" />
                    </div>

                    <>
                        <div>
                            <BlackFont>
                                <div className={style.containerData}>
                                    <p className={`${style.review}`}>
                                        Revisando...
                                    </p>
                                    <p className={`${style.paragraph} ${points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) > 50 ? style.green : style.red}`}>
                                        {points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) > 50 ? 'Aprobaste 😄' : 'Reprobaste 😅'}
                                    </p>

                                    {points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) < 51 
                                    ? <p className={style.message}>Animo, intentalo otra vez!!! <spam className={style.emogi}>😅</spam></p>
                                    : ''}
                                    {points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) > 50 && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) < 70
                                    ? <p className={style.message}>Bien, vamos x más!!! <spam className={style.emogi}>😅</spam></p>
                                    : ''}
                                    {points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) > 69 && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) < 85
                                    ? <p className={style.message}>Muy Bien, buen progreso!!! <spam className={style.emogi}>😀</spam></p>
                                    : ''}
                                    {points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) > 84 && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) < 100
                                    ? <p className={style.message}>Exelente, vamos super!!! <spam className={style.emogi}>😃</spam></p>
                                    : ''}
                                    {points !== null && Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) == 100
                                    ? <p className={style.perfect}>Perfectooo, felicidades!!! <spam className={style.emogi}>😍</spam></p>
                                    : ''}
                                    
                                    
                                    <CircularProgressBar
                                        colorCircle="#365b74"
                                        fontColor="#00F0FF"
                                        size="150"
                                        fontSize= "24px"
                                        unit= "%"
                                        linearGradient={[
                                            '#8ff8ff',
                                            '#00F0FF',
                                        ]}
                                        percent={points !== null ? Math.round(points.success * 100 / (points.success + points.mistakes + points.undefined)) : 0}
                                        round
                                    />
                                </div>
                                {points !== null && <div>
                                    <p className={`${style.blueText} ${style.materia}`}> Materia: {router.query.Simulacro}</p>
                                    <p className={`${style.blueText} ${style.errores}`}> Errores: {points.mistakes} 
                                    <div className={style.progressPorcent} onClick={()=>manageVisibility(i)}>
                                     <div className={style.porcent} style={{ background: 'red', width: `${10}%`, height: '10px' }}> 
                                    </div>

                                </div>
                                    </p>
                                    <p className={`${style.blueText} ${style.aciertos}`}> Aciertos: {points.success}</p>
                                    <p className={`${style.blueText} ${style.noRes}`}> No respondidos: {points.undefined}</p>
                                </div>}
                                <p className={`${style.blueText} ${style.verRes}`}>Ver respuestas</p>
                            </BlackFont>
                        </div>


                    </>
                </div>
            }
        </PageEspecial>
    )
}
export default WithAuth(Simulacro)











{/* <ChangingProgressProvider values={[0, 80]}>
                                        {(percentage) => (
                                            <CircularProgressbar
                                                value={percentage}
                                                text={`${percentage}%`}
                                                styles={buildStyles({
                                                    pathTransition:
                                                        percentage === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s",
                                                        pathColor: `#00F0FF`,
                                                        textColor: '#00F0FF',
                                                        trailColor: '#d6d6d6',
                                                })}
                                            />
                                        )}
                                    </ChangingProgressProvider> */}



 {/* <ChangingProgressProvider values={[0, 80]}>
                                    {(percentage) => (
                                            <CircularProgressbarWithChildren
                                                value={percentage}
                                                text={`${percentage}%`}
                                                strokeWidth={10}
                                                styles={buildStyles({
                                                    strokeLinecap: "butt",
                                                    pathTransition:
                                                        percentage === 0 ? "none" : "stroke-dashoffset 0.5s linear 0s "
                                                })}
                                            >
                                                <RadialSeparators
                                                    count={12}
                                                    style={{
                                                        background: "black",
                                                        width: "2px",
                                                        // This needs to be equal to props.strokeWidth
                                                        height: `${10}%`
                                                    }}
                                                />
                                            </CircularProgressbarWithChildren>
                                    )}
                                </ChangingProgressProvider>  */}