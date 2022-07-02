
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




function Simulacro () {
    const { userDB,  setUserSuccess, success, simulacro, setUserSimulacro} = useUser()
    const [objet, setObjet] = useState(null)
    const [select, setSelect] = useState(null)
    const [countR, setCountR] = useState(0)
    const [countE, setCountE] = useState(0)
    const [array, setArray] = useState(['a', 'b', 'c', 'd'])

    

    const router = useRouter()


    function fisherYatesShuffle(arr){
        
        for(var i =arr.length-1 ; i>0 ;i--){
            var j = Math.floor( Math.random() * (i + 1) ); //random index
            [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
        }
        return setArray(arr)
    }
    

    function obj (){
        router.push(`/Simulacro/${router.query.Simulacro}/${parseInt(router.query.Index) + 1}`)
        setSelect(null)
        // const dificult = 10
        // const nOne = Math.floor(Math.random()*(dificult-1))+1
        // const nTwo = Math.floor(Math.random()*(dificult-0))+0
        // const ale = () => Math.floor(Math.random()*(11-1))+1
        // const nFour = Math.floor(Math.random()*(5-1))+1
        // const res = nOne+nTwo
        // const errO = nOne == nTwo || nOne == 0 || nTwo == 0? ale(): nOne
        // const errT = nOne == nTwo || nOne == 0 || nTwo == 0? ale(): nTwo

        // setObjet({
        //     nOne,
        //     nTwo,
        //     nFour,
        //     res,
        //     errO,
        //     errT,
        //     correct: null,
        //     selected: null,
        // })
      
    }

    console.log(router.query)
    console.log(`/${router.query.Simulacro}/${parseInt(router.query.Index) + 1}`)




    function selectAnswer (answer) {
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
        setTimeout(obj, 1500)
        // n == objet.nFour ? setProgress(s+1, userDB.profesor, 's') : setErrors(e+1, userDB.profesor, 's')
        // n == objet.nFour ? setCountR(countR+1) : setCountE(countE+1)
    }







    function nextClick () {
        router.back()
    }
    function userDifficult () {
        router.back()
    }
    simulacro ? console.log(simulacro[router.query.Index - 1][`${array[3]}`]) : ''
    useEffect( () => {
        // obj() 
        fisherYatesShuffle(array)
        userDB.university !== null && userDB.university !== undefined 
        ? getEspecificData( userDB.university, router.query.Simulacro, userDifficult, setUserSimulacro)
        : '' 
    }, [userDB.university]);
    return (
<PageEspecial>
        <div className={style.main}>
        {userDB !== 'loading' &&
            <>
            <div className={style.container}>
                <img src={`/robot.png`} className={style.perfil} alt="user photo" />
                <div className={style.textCont}>
                    <span className={style.white}>N: {`${userDB.aName.split(' ')[0].toUpperCase()}`}</span>
                    <div className={style.contRE}>
                        <span className={style.e}>{countE}</span>
                        <span className={style.r}>{countR}</span>
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
                                    <button className={style.button} onClick={nextClick}>Finalizar</button>
                                </div>
                            </BlackFont>

                </>}
           </div>
           </>}
           {success == false && <Error>Agotaste tu free mode: SUMA</Error>}
        </div>
</PageEspecial>
    )


}
export default WithAuth(Simulacro)
