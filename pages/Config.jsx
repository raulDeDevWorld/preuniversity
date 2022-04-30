import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import PremiumC from '../components/PremiumC'
import { useUser } from '../context/Context.js'
import { useState, useEffect } from 'react'
import { progressReset } from '../firebase/utils'
import Error from '../components/Error'
import Success from '../components/Success'
import Modal from '../components/Modal'




import style from '../styles/Config.module.css'
import router from 'next/router'


function Config () {
    const { setUserAvatar, user, userDB, success, setUserSuccess } = useUser()
    const [mode, setMode] = useState(false)
    const [s, setS] = useState(false)
    const [r, setR] = useState(false)
    const [m, setM] = useState(false)
    const [d, setD] = useState(false)
    function avatar () {
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        router.push('/ConfigAvatar')
    }
    function data () {
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        router.push('/ConfigPerfil')
    }
    function reset () {
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        x()
    }
    function playConfig () {
        if (userDB.premium === false){
            setUserSuccess(false)
            return
        }
        router.push('/PlayConfig')
    }
    function back () {
        router.back()
    }
    function x () {
        setMode(!mode)
    }
    function modalClick () {
        progressReset(userDB.profesor, s, r, m, d)
        setMode(!mode)
        setUserSuccess(true)
    }
    function selectElement (st) {
        switch (st){
            case 's':
                  setS(!s)
                  break;
            case 'r':
                  setR(!r)
                  break;
            case 'm':
                  setM(!m)
                  break;
            case 'd':
                  setD(!d)
            default:
                  break;      
      }
      return

    } 
    return (
        <>
    <PageLayout>
        
         {userDB !== null && userDB !== 'loading' && 
        <div className={style.container}>
            <span className={style.orange}>Config Mode</span>
            <img src="/robot.png" className={style.robot} alt="user photo" />
            <span className={style.title}> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar ? 'Hola,' : 'Bienvenida,'}  {`${userDB.aName.split(' ')[0].toUpperCase()}`}<br /> {userDB.profesor == true? 'Personaliza tu cuenta desde aqui': 'Modifica tu perfil desde aqui' }</span>
            <div className={style.box}>
            <Button style='buttonPrimary' click={avatar}>Avatar</Button>
            <Button style='buttonPrimary'click={data}>Datos de perfil</Button>
            <Button style='buttonPrimary' click={reset}>Resetear progreso </Button>
            <Button style='buttonPrimary' click={playConfig}>Play Config</Button>
            <Button style='buttonSecondary' click={back}>Atras</Button>
            </div>
            <PremiumC></PremiumC>
         </div> 
        }
    </PageLayout>

    <Modal mode={mode} click={x} text={`Selecciona el progreso que quieras resetear`} textTwo={name.toUpperCase()}>
    <span onClick={x} className={style.x}>X</span>
                 <div className={style.boxSelect}>
                    <span className={style.textReset} onClick={()=>selectElement('s')}>Suma </span> {s == true ? <img src='/right.svg' className={style.space} alt='rigth'></img>: ''}
                    </div>
                    <div className={style.boxSelect}>
                    <span className={style.textReset} onClick={()=>selectElement('r')}>Resta </span> {r == true ? <img src='/right.svg' className={style.space} alt='rigth'></img>: ''}
                    </div>
                    <div className={style.boxSelect}>
                    <span className={style.textReset} onClick={()=>selectElement('m')}>Multiplicación </span> {m == true ? <img src='/right.svg' className={style.space} alt='rigth'></img>: ''}
                    </div>
                    <div className={style.boxSelect}>
                    <span className={style.textReset} onClick={()=>selectElement('d')}>División </span> {d == true ? <img src='/right.svg' className={style.space} alt='rigth'></img>: ''}
                    </div>
      
                    <button className={style.modalButton} onClick={modalClick}>Totalmente seguro</button>
                       </Modal>

{success == true && <Success>Correcto</Success>}
{success == false && <Error>Hazte Premium para modificar datos</Error>}
</>
    )
}

export default WithAuth(Config)