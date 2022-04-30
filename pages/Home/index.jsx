import Button from '../../components/Button'
import PremiumC from '../../components/PremiumC'
import { useRouter } from 'next/router'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { useUser } from '../../context/Context.js'
import { handleSignOut } from '../../firebase/utils.js'
import Subtitle from '../../components/Subtitle'
import Error from '../../components/Error'
import BlackFont from '../../components/BlackFont'
import style from '../../styles/Home.module.css'
import styleP from '../../styles/Progress.module.css'
import { useState, useEffect } from 'react'


function Home() { 
    const { setUserAvatar, avatar, user, userDB, success, setUserSuccess } = useUser()
    const router = useRouter()

    function avatarClick(a) {
        setUserAvatar(a)
    }
    function nextClick() {
        avatar !== null ? router.push('/Welcome') : setUserSuccess(false)
        console.log('click')
    }
    function backOut() {
        handleSignOut()
    }
    function practica() {
        userDB.premium !== true ? router.push('https://drive.google.com/drive/folders/1WEakUFwv8boTWwPfwvvXmp1UpfcJ9qpa?usp=sharing'):
        router.push('https://drive.google.com/file/d/1YbG3O2cjmmw732X-XvPDwUqCkJpX9Ifp/view?usp=sharing')     
    }
    function progress() {
        userDB.profesor == true ? router.push('/Progreso'): router.push('/Progress')
    }
    function play () {
        router.push('/Play')
    }
    function robot () {
        router.push('/Robot')
    }
    console.log(userDB)
    useEffect(() => {
        userDB === null ? router.push('/Register'): ''
    }, [userDB]);
    return (
        <>
        <PageLayout>
            {userDB === 'loading' && ''} 
            { userDB !== null && userDB !== 'loading' &&
                <div className={style.containerTwo}>
                    {userDB.premium !== false && <span className={style.subtitle}> Premium</span>}
                    {userDB.premium === false && <span className={style.subtitle}>Free mode</span>}
                 
                    <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="user photo" />
                    <Subtitle> {'ab1' == userDB.avatar || 'ab2' == userDB.avatar? 'Bienvenido': 'Bienvenida'}: <br /> {`${userDB.aName.split(' ')[0].toUpperCase()}`}</Subtitle>
                    <BlackFont> 
                        <div className={style.buttonContainer}>
                            <Button style='buttonBlackFont' click={play}>Simulacro</Button>
                            <Button style='buttonBlackFont'click={progress}>Progreso</Button>
                            <Button style='buttonBlackFont' click={practica}>Banco de P... <span className={style.pdf}>PDF</span></Button>
                            <Button style='buttonBlackFont'click={robot}>Test De O.V</Button>
                        </div>
                        
                    </BlackFont>
   
                    <PremiumC></PremiumC>
                </div>
            }  
        </PageLayout>
        {success ==false && <Error>Elija un avatar</Error>}
        </>
    )
}

export default WithAuth(Home)
