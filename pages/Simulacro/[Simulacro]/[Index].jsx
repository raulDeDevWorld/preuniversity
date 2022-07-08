
import { useState, useEffect } from 'react'
import { useUser } from '../../../context/Context.js'
import { setProgress, setErrors, userDataUpdate, getEspecificData } from '../../../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../../../components/Error'
import Timer from '../../../components/Timer'
import BlackFont from '../../../components/BlackFont'
import PageEspecial from '../../../layouts/PageEspecial'
import { WithAuth } from '../../../HOCs/WithAuth'
import style from '../../../styles/Simulacro.module.css'


function Simulacro() {
    const { userDB, setUserSuccess, success, setUserData, simulacro, setUserSimulacro, bank, setUserBank, } = useUser()
    const [select, setSelect] = useState(null)
    const [count, setCount] = useState(0)
    const [array, setArray] = useState(['a', 'b', 'c', 'd'])

    const router = useRouter()

    function fisherYatesShuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1)); //random index
            [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        }
        return setArray(arr)
    }

    function selectAnswer(answer) {
        setSelect(answer)
        const updateSimulacro = simulacro.reduce((array, item, index) => {
            const updateItem = index == router.query.Index - 1 ? { ...item, userAnswer: answer } : item
            return [...array, updateItem]
        }, [])
        setUserSimulacro(updateSimulacro, null)
        // const updateCount = simulacro.reduce((i, item) => {
        //     console.log(item)
        //     const updateItem = item.userAnswer !== null ? console.log('si') : console.log('no') 
        //     return updateItem 
        // }, 0)
        // setCount(1)
        // setTimeout(next, 1500)
        simulacro[router.query.Index - 1].userAnswer == undefined ? setCount(count + 1) : ''

    }

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

    simulacro && router.query.Index ? console.log(simulacro) : ''
    // simulacro && router.query.Index? console.log(array) : ''
    // simulacro && router.query.Index? console.log(simulacro[router.query.Index-1]) : ''


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
                    {simulacro !== null &&
                        <>
                            <div className={style.blackAsksContainer}>
                            <BlackFont>
                                <Timer time={userDB.subjects[router.query.Simulacro.toLowerCase()].config.time} style={style.timer} />
                                <span className={style.asksCount}>Item: {router.query.Index}/{simulacro.length}</span>
                                <div className={style.asksBar}>
                                    {simulacro.map((item, index) =>
                                        <div key={index} className={`${simulacro[index].userAnswer !== undefined ? style.answered : ''} ${router.query.Index == index + 1 ? style.focus : ''}`} onClick={() => nav(index)}></div>
                                    )}
                                </div>
                                <div className={style.asksContainer}>
                            
                                        <span className={style.move} onClick={back}>{'<<'}</span><p className={style.ask}>{simulacro[router.query.Index - 1].pregunta}</p><span className={style.move} onClick={next}>{'>>'}</span>
                
                                </div>

                            </BlackFont>
                            </div>

                            <div className={style.blackAnswersContainer}>
                                <BlackFont>
                                    <>
                                        <span className={style.answersCount}>Resp: {count}/{simulacro.length}</span>
                                        <div className={style.answersContainer}>
                                            <div className={`${style.answerButtons} ${select == array[0] || simulacro[router.query.Index - 1].userAnswer == array[0] ? style.green : ''}`} onClick={(e) => { selectAnswer(array[0]) }} > {simulacro[router.query.Index - 1][`${array[0]}`]} </div>
                                            <div className={`${style.answerButtons} ${select == array[1] || simulacro[router.query.Index - 1].userAnswer == array[1] ? style.green : ''}`} onClick={(e) => { selectAnswer(array[1]) }} > {simulacro[router.query.Index - 1][`${array[1]}`]} </div>
                                            <div className={`${style.answerButtons} ${select == array[2] || simulacro[router.query.Index - 1].userAnswer == array[2] ? style.green : ''}`} onClick={(e) => { selectAnswer(array[2]) }} > {simulacro[router.query.Index - 1][`${array[2]}`]} </div>
                                            <div className={`${style.answerButtons} ${select == array[3] || simulacro[router.query.Index - 1].userAnswer == array[3] ? style.green : ''}`} onClick={(e) => { selectAnswer(array[3]) }} > {simulacro[router.query.Index - 1][`${array[3]}`]} </div>
                                            <button className={style.buttonFinishAnswer} onClick={finish}>Finalizar</button>
                                        </div>
                                    </>

                                </BlackFont>
                            </div>


                        </>}
                </div>
            }
            {success == false && <Error>Agotaste tu free mode: SUMA</Error>}
        </PageEspecial>
    )
}
export default WithAuth(Simulacro)









  // // if (userDB.premium === false && userDB.s + userDB.es > 30) {
        // //     setUserSuccess(false) 
        // // return}
        // setSelect(answer)
        // const query = router.query.Simulacro.toLowerCase()
        // //Consulta: si la respuesta es correcta
        // if (answer == simulacro[router.query.Index - 1].respuesta) {
        //     setCountR(countR + 1)
        //     //Consulta: si el progress existe
        //     if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress) {
        //         //Consulta: si un item existe dentro del progress
        //         if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index -1].id]) {
        //             console.log('Consulta: si un item existe dentro del progress')
        //             const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
        //             const dataDBid = userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index -1].id]
        //             const object = {}
        //             object[simulacro[router.query.Index - 1].id] = { points: dataDBid.points + 1, errors: dataDBid.errors, difficulty: dataDBid.difficulty }
        //             userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
        //             //Consulta: si un item no existe dentro del progress    
        //         } else {
        //             console.log('Consulta: si un item no existe dentro del progress ')
        //             console.log(userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index -1].id])
        //             const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
        //             const object = {}
        //             object[simulacro[router.query.Index - 1].id] = { points: 1, errors: 0, difficulty: false }
        //             userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
        //         }
        //         //si el progreso no existe
        //     } else {
        //         console.log('si el progreso no existe')
        //         const object = { progress: {} }
        //         object.progress[simulacro[router.query.Index - 1].id] = { points: 1, errors: 0, difficulty: false }
        //         userDataUpdate(object, setUserData, query)
        //     }
        //     //si la respuesta es incorrecta
        // } else {
        //     setCountE(countE + 1)
        //     //Consulta: si el progress existe
        //     if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress) {
        //         //Consulta: si un item existe dentro del progress
        //         if (userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index - 1].id]) {
        //             console.log('existe')
        //             const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
        //             const dataDBid = userDB.subjects[router.query.Simulacro.toLowerCase()].progress[simulacro[router.query.Index -1].id]
        //             const object = {}
        //             object[simulacro[router.query.Index - 1].id] = { points: dataDBid.points, errors: dataDBid.errors + 1, difficulty: dataDBid.difficulty }
        //             userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
        //             //Consulta: si un item no existe dentro del progress    
        //         } else {
        //             const dataDB = userDB.subjects[router.query.Simulacro.toLowerCase()].progress
        //             const object = {}
        //             object[simulacro[router.query.Index - 1].id] = { points: 0, errors: 1, difficulty: false }
        //             userDataUpdate({ ...dataDB, ...object }, setUserData, `${query}/progress`)
        //         }
        //         //si el progreso no existe
        //     } else {
        //         const object = { progress: {} }
        //         object.progress[simulacro[router.query.Index - 1].id] = { points: 0, errors: 1, difficulty: false }
        //         userDataUpdate(object, setUserData, query)
        //     }
        // }



             {/* <BlackFont>
                                <div className={style.answersContainer}>
                                    <div className={`${style.box} ${select !== null && select == array[0] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[0] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[0]) }} > {simulacro[router.query.Index - 1][`${array[0]}`]} </div>
                                    <div className={`${style.box} ${select !== null && select == array[1] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[1] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[1]) }} > {simulacro[router.query.Index - 1][`${array[1]}`]} </div>
                                    <div className={`${style.box} ${select !== null && select == array[2] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[2] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[2]) }} > {simulacro[router.query.Index - 1][`${array[2]}`]} </div>
                                    <div className={`${style.box} ${select !== null && select == array[3] && select !== simulacro[router.query.Index - 1].respuesta ? style.red : ''}  ${select !== null && array[3] == simulacro[router.query.Index - 1].respuesta ? style.green : ''}`} onClick={(e) => { selectAnswer(array[3]) }} > {simulacro[router.query.Index - 1][`${array[3]}`]} </div>
                                    <button className={style.button} onClick={finish}>Finalizar</button>
                                </div>
                            </BlackFont> */}