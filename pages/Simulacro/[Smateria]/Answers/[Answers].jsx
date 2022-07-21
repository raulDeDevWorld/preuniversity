
import { useState, useEffect } from 'react'
import { useUser } from '../../../../context/Context.js'
import { setProgress, setErrors, userDataUpdate, getEspecificData } from '../../../../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../../../../components/Error'
import Timer from '../../../../components/Timer'
import BlackFont from '../../../../components/BlackFont'
import PageSimulacro from '../../../../layouts/PageSimulacro'
import { WithAuth } from '../../../../HOCs/WithAuth'
import style from '../../../../styles/Smateria.module.css'


function Simulacro() {
    const { userDB, setUserSuccess, success, setUserData, simulacro, setUserSimulacro, bank, setUserBank, fisherArray } = useUser()
    const [select, setSelect] = useState(null)
    const [count, setCount] = useState(0)

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
        router.query.Answers > 1
            ? router.push(`/Simulacro/${router.query.Smateria}/Answers/${parseInt(router.query.Answers) - 1}`)
            : ''
        setSelect(null)
    }
    function next() {
        router.query.Answers < simulacro.length
            ? router.push(`/Simulacro/${router.query.Smateria}/Answers/${parseInt(router.query.Answers) + 1}`)
            : ''
        setSelect(null)
    }
    function finish() {
        router.push(`/Simulacro/${router.query.Smateria}/Result`)
    }
    function nav(i) {

        router.push(`/Simulacro/${router.query.Smateria}/Answers/${parseInt(i) + 1}`)

        setSelect(null)
    }

    console.log(userDB.subjects[router.query.Smateria.toLowerCase()].progress)
    console.log(simulacro)
    useEffect(() => {

        // fisherYatesShuffle(array)
        // userDB.university !== null && userDB.university !== undefined
        //     ? getEspecificData(userDB.university, router.query.Smateria, userDB.subjects[router.query.Smateria.toLowerCase()].config.questions, simulacro, setUserSimulacro, bank, setUserBank)
        //     : ''


    }, [simulacro]);
    return (
        <PageSimulacro>
            {userDB !== 'loading' &&
                <div className={style.container}>
                    {simulacro !== null &&
                        <>
                            <div className={style.dataContainer}>
                                <div className={style.asksBar}>
                                    {simulacro.map((item, index) =>
                                        <div key={index} className={`${simulacro[index].userAnswer !== undefined && simulacro[index].userAnswer == simulacro[index].respuesta ? style.green : ''} ${simulacro[index].userAnswer !== undefined && simulacro[index].userAnswer !== simulacro[index].respuesta ? style.red : ''} ${simulacro[index].userAnswer == undefined ? style.gray : ''} ${router.query.Answers == index + 1 ? style.focus : ''}`} onClick={() => nav(index)}></div>
                                    )}
                                </div>
                                <div className={style.counters}>
                                    <span className={style.asksCount}>Item: {router.query.Answers}/{simulacro.length}</span>
                                    <span className={style.answersCount}>Resp: {count}/{simulacro.length}</span>
                                </div>
                                <div className={style.selectDifficulty}>
                                    <div>F</div>
                                    <div>R</div>
                                    <div>D</div>
                                </div>
                                
                            </div>
                            <div className={style.asksContainer}>
                                    <span className={style.move} onClick={back}>{'<|'}</span>
                                    <p className={style.ask}>{simulacro[router.query.Answers - 1].pregunta}</p>
                                    <span className={style.move} onClick={next}>{'|>'}</span>
                                </div>
                            <div className={style.answersContainer}>
                                <div className={`${style.answerButtons} ${simulacro[router.query.Answers - 1].respuesta == fisherArray[0] ? style.green : ''} ${simulacro[router.query.Answers - 1].userAnswer !== simulacro[router.query.Answers - 1].respuesta && simulacro[router.query.Answers - 1].userAnswer == fisherArray[0] ? style.red : ''} ${simulacro[router.query.Answers - 1].userAnswer == undefined && simulacro[router.query.Answers - 1].respuesta !== fisherArray[0] ? style.gray : ''} `}> {simulacro[router.query.Answers - 1][`${fisherArray[0]}`]} </div>
                                <div className={`${style.answerButtons} ${simulacro[router.query.Answers - 1].respuesta == fisherArray[1] ? style.green : ''} ${simulacro[router.query.Answers - 1].userAnswer !== simulacro[router.query.Answers - 1].respuesta && simulacro[router.query.Answers - 1].userAnswer == fisherArray[1] ? style.red : ''} ${simulacro[router.query.Answers - 1].userAnswer == undefined && simulacro[router.query.Answers - 1].respuesta !== fisherArray[1] ? style.gray : ''} `}> {simulacro[router.query.Answers - 1][`${fisherArray[1]}`]} </div>
                                <div className={`${style.answerButtons} ${simulacro[router.query.Answers - 1].respuesta == fisherArray[2] ? style.green : ''} ${simulacro[router.query.Answers - 1].userAnswer !== simulacro[router.query.Answers - 1].respuesta && simulacro[router.query.Answers - 1].userAnswer == fisherArray[2] ? style.red : ''} ${simulacro[router.query.Answers - 1].userAnswer == undefined && simulacro[router.query.Answers - 1].respuesta !== fisherArray[2] ? style.gray : ''} `}> {simulacro[router.query.Answers - 1][`${fisherArray[2]}`]} </div>
                                <div className={`${style.answerButtons} ${simulacro[router.query.Answers - 1].respuesta == fisherArray[3] ? style.green : ''} ${simulacro[router.query.Answers - 1].userAnswer !== simulacro[router.query.Answers - 1].respuesta && simulacro[router.query.Answers - 1].userAnswer == fisherArray[3] ? style.red : ''} ${simulacro[router.query.Answers - 1].userAnswer == undefined && simulacro[router.query.Answers - 1].respuesta !== fisherArray[3] ? style.gray : ''} `}> {simulacro[router.query.Answers - 1][`${fisherArray[3]}`]} </div>
                                <button className={style.buttonFinishAnswer} onClick={finish}>Finalizar</button>
                            </div>
                        </>}
                </div>
            }
            {success == false && <Error>Agotaste tu free mode: SUMA</Error>}
        </PageSimulacro>
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


