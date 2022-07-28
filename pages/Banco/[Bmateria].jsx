
import { useState, useEffect } from 'react'
import { useUser } from '../../context/Context.js'
import { setProgress, setErrors, userDataUpdate, updateBank } from '../../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../../components/Error'
import Modal from '../../components/Modal'
import BlackFont from '../../components/BlackFont'
import PageSimulacroLayout from '../../layouts/PageSimulacroLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import style from '../../styles/Bmateria.module.css'


function Simulacro() {
    const { userDB, setUserSuccess, success, setUserData, simulacro, setUserSimulacro, bank, setUserBank, fisherArray, setUserFisherArray } = useUser()
    const [modal, setModal] = useState(false)
    const [seeRes, setSeeRes] = useState(false)

    const router = useRouter()


    function handlerSeeRes () {
        setSeeRes(!seeRes)
    }
    // function fisherYatesShuffle(arr) {
    //     for (var i = arr.length - 1; i > 0; i--) {
    //         var j = Math.floor(Math.random() * (i + 1)); //random index
    //         [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    //     }
    //     return setUserFisherArray(arr)
    // }

    // function selectAnswer(answer) {
    //     setSelect(answer)
    //     const updateSimulacro = simulacro.reduce((array, item, index) => {
    //         const updateItem = index == router.query.Index - 1 ? { ...item, userAnswer: answer } : item
    //         return [...array, updateItem]
    //     }, [])
    //     setUserSimulacro(updateSimulacro, null)
    //     // const updateCount = simulacro.reduce((i, item) => {
    //     //     console.log(item)
    //     //     const updateItem = item.userAnswer !== null ? console.log('si') : console.log('no') 
    //     //     return updateItem 
    //     // }, 0)
    //     // setCount(1)
    //     // setTimeout(next, 1500)
    //     simulacro[router.query.Index - 1].userAnswer == undefined ? setCount(count + 1) : ''

    // }

    // function back() {
    //     router.query.Index > 1
    //         ? router.push(`/Simulacro/${router.query.Smateria}/${parseInt(router.query.Index) - 1}`)
    //         : ''
    //     setSelect(null)
    // }
    // function next() {
    //     router.query.Index < simulacro.length
    //         ? router.push(`/Simulacro/${router.query.Smateria}/${parseInt(router.query.Index) + 1}`)
    //         : ''
    //     setSelect(null)
    // }
    // function finish() {
    //     const oldObject = userDB.subjects[router.query.Smateria.toLowerCase()].progress
    //     const newObject = simulacro.reduce((object, item, index)=>{
    //         const newItemObject= {}
    //         // exit === DB
    //         const exist = userDB.subjects[router.query.Smateria.toLowerCase()].progress[simulacro[index].id]

    //         const answer = simulacro[index].userAnswer === simulacro[index].respuesta 
    //         const answerUndefined = simulacro[index].userAnswer
    //         // console.log(exist.mistake + 1)
    //         newItemObject[item.id] = {
    //             difficulty: false,
    //             mistakes: exist === undefined ? (answer === false && answerUndefined !== undefined ? 1 : 0) : (answer === false && answerUndefined !== undefined ? exist.mistakes + 1 : exist.mistakes),
    //             success: exist === undefined ? (answer === true ? 1 : 0) : (answer === true ? exist.success + 1 : exist.success),
    //             undefineds: exist === undefined ? (answerUndefined === undefined? 1 : 0) : (answerUndefined === undefined? exist.undefineds + 1 : exist.undefineds),
    //         }

    //         return {...object, ...newItemObject}
    //     }, {})

    //     userDataUpdate({...oldObject, ...newObject}, setUserData, `${router.query.Smateria.toLowerCase()}/progress`)
    //     router.push(`/Simulacro/${router.query.Smateria}/Result`)
    // }
    // function nav(i) {

    //     router.push(`/Simulacro/${router.query.Smateria}/${parseInt(i) + 1}`)

    //     setSelect(null)
    // }
    // console.log(bank)
function modalHandler () {
    setModal(!modal)
}

    useEffect(() => {
        if (userDB.university) {
            if (bank) {
                bank[router.query.Bmateria.toLowerCase()] ? console.log('exist') : updateBank(userDB.university, router.query.Bmateria, bank, setUserBank)
            } else {
                updateBank(userDB.university, router.query.Bmateria, bank, setUserBank)
            }
        }
    }, [userDB.university, bank, seeRes])

    return (
        <PageSimulacroLayout>
            {userDB !== 'loading' &&
                <div className={style.container}>
                    {bank && bank[router.query.Bmateria.toLowerCase()] &&
                        <>
                            {bank[router.query.Bmateria.toLowerCase()].map((item, index) =>
                                <div key={index} className={style.itemBox}>
                                    <li className={style.ask} onClick={modalHandler}>
                                        {console.log(item)}
                                        {                                               /*Consultamos si un item (len1) existe en el progres && validamos que su valor no sea false*/}
                                        <span className={style.number}>{`${index + 1}-${userDB.subjects[router.query.Bmateria.toLowerCase()].progress[item.id] && userDB.subjects[router.query.Bmateria.toLowerCase()].progress[item.id].difficulty != false ? userDB.subjects[router.query.Bmateria.toLowerCase()].progress[item.id].difficulty : 'I'})`}{ }</span>{item.pregunta}
                                    </li><br />
                                    <li className={`${style.options} ${seeRes == true && item.respuesta !== 'a' ? style.norespuesta : ''}`}><span className={style.number}>{'a)'}</span>{item.a}</li><br />
                                    <li className={`${style.options} ${seeRes == true && item.respuesta !== 'b' ? style.norespuesta : ''}`}><span className={style.number}>{'b)'}</span>{item.b}</li><br />
                                    <li className={`${style.options} ${seeRes == true && item.respuesta !== 'c' ? style.norespuesta : ''}`}><span className={style.number}>{'c)'}</span>{item.c}</li><br />
                                    <li className={`${style.options} ${seeRes == true && item.respuesta !== 'd' ? style.norespuesta : ''}`}><span className={style.number}>{'d)'}</span>{item.d}</li><br />
                                </div>
                            )}
                        </>
                    }
                    <span className={ `${style.seeRes} ${seeRes == true ? style.seeImgRes : style.noSeeImgRes }`} onClick={handlerSeeRes}></span>
                </div>
            }
            {/* {success == false && <Error>Agotaste tu free mode: SUMA</Error>} */}
            <Modal mode={modal} click={modalHandler}> khkj</Modal>
        </PageSimulacroLayout>
    )
}
export default WithAuth(Simulacro)





              {/* {simulacro !== null &&
                        <>
                            <div className={style.blackAsksContainer}>
                                <BlackFont>
                                    <Timer time={userDB.subjects[router.query.Smateria.toLowerCase()].config.time} style={style.timer} />
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
                            </div><br />
                            <div className={style.blackAnswersContainer}>
                                <BlackFont>
                                    <>
                                        <span className={style.answersCount}>Resp: {count}/{simulacro.length}</span>
                                        <div className={style.answersContainer}>
                                            <div className={`${style.answerButtons} ${select == fisherArray[0] || simulacro[router.query.Index - 1].userAnswer == fisherArray[0] ? style.green : ''}`} onClick={(e) => { selectAnswer(fisherArray[0]) }} > {simulacro[router.query.Index - 1][`${fisherArray[0]}`]} </div>
                                            <div className={`${style.answerButtons} ${select == fisherArray[1] || simulacro[router.query.Index - 1].userAnswer == fisherArray[1] ? style.green : ''}`} onClick={(e) => { selectAnswer(fisherArray[1]) }} > {simulacro[router.query.Index - 1][`${fisherArray[1]}`]} </div>
                                            <div className={`${style.answerButtons} ${select == fisherArray[2] || simulacro[router.query.Index - 1].userAnswer == fisherArray[2] ? style.green : ''}`} onClick={(e) => { selectAnswer(fisherArray[2]) }} > {simulacro[router.query.Index - 1][`${fisherArray[2]}`]} </div>
                                            <div className={`${style.answerButtons} ${select == fisherArray[3] || simulacro[router.query.Index - 1].userAnswer == fisherArray[3] ? style.green : ''}`} onClick={(e) => { selectAnswer(fisherArray[3]) }} > {simulacro[router.query.Index - 1][`${fisherArray[3]}`]} </div>
                                            <button className={style.buttonFinishAnswer} onClick={finish}>Finalizar</button>
                                        </div>
                                    </>

                                </BlackFont>
                            </div>
                        </>} */}