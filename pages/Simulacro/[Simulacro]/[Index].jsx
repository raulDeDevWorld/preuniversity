
import { useState, useEffect } from 'react'
import { useUser } from '../../../context/Context.js'
import { setProgress, setErrors, userDataUpdate, getEspecificData } from '../../../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../../../components/Error'
import Button from '../../../components/Button'
import BlackFont from '../../../components/BlackFont'
import PageEspecial from '../../../layouts/PageEspecial'
import { WithAuth } from '../../../HOCs/WithAuth'
import style from '../../../styles/Simulacro.module.css'


function Simulacro() {
    const { userDB, setUserSuccess, success, setUserData, simulacro, setUserSimulacro, bank, setUserBank, } = useUser()
    const [select, setSelect] = useState(null)
    const [countR, setCountR] = useState(0)
    const [countE, setCountE] = useState(0)
    const [array, setArray] = useState(['a', 'b', 'c', 'd'])

    const router = useRouter()

    function fisherYatesShuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)); //random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return setArray(arr)
    }


    function next() {
        router.push(`/Simulacro/${router.query.Simulacro}/${parseInt(router.query.Index) + 1}`)
        setSelect(null)
    }

    function selectAnswer(answer) {
        // if (userDB.premium === false && userDB.s + userDB.es > 30) {
        //     setUserSuccess(false) 
        // return}
        setSelect(answer)
        const query = router.query.Simulacro.toLowerCase()
        //Consulta: si la respuesta es correcta
        if (answer == simulacro[router.query.Index - 1].respuesta) {
            setCountR(countR + 1)
            //Consulta: si el progress existe
            if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress) {
                //Consulta: si un item existe dentro del progress
                if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index].id]) {
                    console.log('existe')
                    const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
                    const dataDBid = userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index].id]
                    const object = {}
                    object[simulacro[router.query.Index - 1].id] = { points: dataDBid.points + 1, errors: dataDBid.errors, difficulty: dataDBid.difficulty }
                    userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
                    //Consulta: si un item no existe dentro del progress    
                } else {
                    const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
                    const object = {}
                    object[simulacro[router.query.Index - 1].id] = { points: 1, errors: 0, difficulty: false }
                    userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
                }
                //si el progreso no existe
            } else {
                const object = { progress: {} }
                object.progress[simulacro[router.query.Index - 1].id] = { points: 1, errors: 0, difficulty: false }
                userDataUpdate(object, setUserData, query)
            }
            //si la respuesta es incorrecta
        } else {
            setCountE(countE + 1)
            //Consulta: si el progress existe
            if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress) {
                //Consulta: si un item existe dentro del progress
                if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index].id]) {
                    console.log('existe')
                    const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
                    const dataDBid = userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index].id]
                    const object = {}
                    object[simulacro[router.query.Index - 1].id] = { points: dataDBid.points, errors: dataDBid.errors + 1, difficulty: dataDBid.difficulty }
                    userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
                    //Consulta: si un item no existe dentro del progress    
                } else {
                    const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
                    const object = {}
                    object[simulacro[router.query.Index - 1].id] = { points: 0, errors: 1, difficulty: false }
                    userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
                }
                //si el progreso no existe
            } else {
                const object = { progress: {} }
                object.progress[simulacro[router.query.Index - 1].id] = { points: 0, errors: 1, difficulty: false }
                userDataUpdate(object, setUserData, query)
            }
        }
        setTimeout(next, 1500)
    }


    function finish() {
        router.push('/Home')
    }
    function userDifficult() {
        router.back()
    }
    simulacro ? console.log(simulacro[router.query.Index].id) : ''
    simulacro ? console.log(userDB.subjects[router.query.Simulacro.toLowerCase()].progress) : ''
    // simulacro ? console.log(simulacro[router.query.Index - 1][`${array[3]}`]) : ''
    useEffect(() => {
        fisherYatesShuffle(array)
        userDB.university !== null && userDB.university !== undefined
            ? getEspecificData(userDB.university, router.query.Simulacro, userDB.subjects[router.query.Simulacro.toLowerCase()].config.questions, simulacro, setUserSimulacro, bank, setUserBank)
            : ''
    }, [userDB.university, bank]);
    return (
        <PageEspecial>
            {userDB !== 'loading' &&
                <div className={style.container}>
                    <div>
                        <img src={`/robot.png`} className={style.perfil} alt="user photo" />
                        <div className={style.textCont}>
                            <span className={style.white}>N: {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span>
                            <div className={style.contRE}>
                                <span className={style.e}>{countE}</span>
                                <span className={style.r}>{countR}</span>
                            </div>
                        </div>
                    </div>
                    {simulacro !== null &&
                        <>
                            <BlackFont>
                                <p className={style.ask}>{simulacro[router.query.Index - 1].pregunta}</p>

                            </BlackFont>
                            <BlackFont>
                                <div className={style.answersContainer}>
                                    <div className={`${style.box} ${select !== null && select == array[0] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[0] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[0]) }} > {simulacro[router.query.Index - 1][`${array[0]}`]} </div>
                                    <div className={`${style.box} ${select !== null && select == array[1] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[1] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[1]) }} > {simulacro[router.query.Index - 1][`${array[1]}`]} </div>
                                    <div className={`${style.box} ${select !== null && select == array[2] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[2] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[2]) }} > {simulacro[router.query.Index - 1][`${array[2]}`]} </div>
                                    <div className={`${style.box} ${select !== null && select == array[3] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[3] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[3]) }} > {simulacro[router.query.Index - 1][`${array[3]}`]} </div>
                                    <button className={style.button} onClick={finish}>Finalizar</button>
                                </div>
                            </BlackFont>

                        </>}
                </div>
            }
            {success == false && <Error>Agotaste tu free mode: SUMA</Error>}
        </PageEspecial>
    )
}
export default WithAuth(Simulacro)
