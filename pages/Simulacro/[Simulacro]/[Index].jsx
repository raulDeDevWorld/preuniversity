
import { useState, useEffect } from 'react'
import { useUser } from '../../../context/Context.js'
import { setProgress, setErrors, getEspecificData } from '../../../firebase/utils'
import { useRouter } from 'next/router'
import Error from '../../../components/Error'
import Button from '../../../components/Button'
import BlackFont from '../../../components/BlackFont'
import PageEspecial from '../../../layouts/PageEspecial'
import { WithAuth } from '../../../HOCs/WithAuth'
import style from '../../../styles/Simulacro.module.css'




function Simulacro() {
    const { userDB, setUserSuccess, success, simulacro, setUserSimulacro, bank, setUserBank, } = useUser()
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
        setSelect(answer)
        // if (userDB.premium === false && userDB.s + userDB.es > 30) {
        //     setUserSuccess(false) 
        // return}

        // const s = userDB.s
        // const e = userDB.es
        // const o = {
        //     correct: true, selected: n,
        // }
        // setObjet({...objet, ...o,})
        setTimeout(next, 1500)
        // n == objet.nFour ? setProgress(s+1, userDB.profesor, 's') : setErrors(e+1, userDB.profesor, 's')
        // n == objet.nFour ? setCountR(countR+1) : setCountE(countE+1)
    }


    function finish() {
        router.push('/Home')
    }
    function userDifficult() {
        router.back()
    }
    console.log(simulacro)
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
