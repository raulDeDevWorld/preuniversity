import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import {  userDataUpdate } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import Button from '../components/Button'
import style from '../styles/Edu.module.css'
import BlackFont from '../components/BlackFont'

function Edu () {
    const {userDB, uniData, setUserData} = useUser()
    const router = useRouter()

  
    function click (university) {
        const object = {university,}
        userDataUpdate(object, setUserData)
        router.push(`/University`)
    }

    function back () {
        router.back()
    }

    // useEffect(() => {
    //     userDB === null ? router.push('/Register'): ''
    // }, [userDB]);
console.log(uniData)

    return (
    <PageLayout>
        <div className={style.container}>
        {userDB && userDB.avatar && <>
        <img src={`/${userDB.avatar}.png`} className={style.perfil} alt="avatar" />
            <BlackFont>
            <div>
                
              <div className={style.subtitle}>Muy bien {(`${userDB.name}`).split(' ')[0].toUpperCase()}</div>
            <div className={style.subtitle}>Donde te postularas</div>  
            </div>
            
            <div className={style.edu}>
                <Button style={'buttonPrimary'} click={()=>click('ESFM')}>ESFM</Button>
                <Button style={'buttonPrimary'} click={()=>click('USFX')}>USFX</Button>
                <Button style={'buttonSecondary'} click={back}>atras</Button>      
            </div> 
            </BlackFont>
        </>}
        </div>
    </PageLayout>
    )
}
export default WithAuth(Edu)