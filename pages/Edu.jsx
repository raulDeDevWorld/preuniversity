import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import {  userDataUpdate } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import Button from '../components/Button'
import style from '../styles/Facultad.module.css'
import styleH from '../styles/Home.module.css'


function Edu () {
    const {userDB} = useUser()
    const router = useRouter()

  
    function click (university) {
        const object = {university,}
        userDataUpdate(object)
        router.push(`/University`)
    }

    function back () {
        router.back()
    }

    // useEffect(() => {
    //     userDB === null ? router.push('/Register'): ''
    // }, [userDB]);


    return (
    <PageLayout className={style.container}>
        <div className={style.container}>
        {userDB && userDB.avatar && <>
        <img src={`/${userDB.avatar}.png`} className={styleH.perfil} alt="avatar" />
            <div>
              <Subtitle>Muy bien {(`${userDB.name}`).split(' ')[0].toUpperCase()}</Subtitle>
            <Subtitle>Donde te postularas</Subtitle>  
            </div>
            
            <div className={style.edu}>
                <Button style={'buttonPrimary'} click={()=>click('ESFM')}>ESFM</Button>
                <Button style={'buttonPrimary'} click={()=>click('USFX')}>USFX</Button>
                <Button style={'buttonSecondary'} click={back}>atras</Button>      
            </div> 
        </>}
        </div>
    </PageLayout>
    )
}
export default WithAuth(Edu)