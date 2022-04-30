import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../context/Context.js'
import PageLayout from '../../layouts/PageLayout'
import { WithAuth } from '../../HOCs/WithAuth'
import { dataUser } from '../../firebase/utils'
import Subtitle from '../../components/Subtitle'
import Button from '../../components/Button'
import style from '../../styles/Facultad.module.css'
import styleH from '../../styles/Home.module.css'

import { firebaseConfig } from '../../firebase/config.js'

function Edu (props) {
    const { avatar, user, userDB, success, setUserSuccess } = useUser()
    const router = useRouter()
    function selected (e) {
        e.preventDefault()
        const career = e.target.textContent
        dataUser(career)
        router.push('/Home')
    }
    function usfx (e) {
        e.preventDefault()
        
        router.push(`/Home/USFX`)
    }
    function back () {
        router.back()
    }
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
                <Button style={'buttonPrimary'} click={selected}>ESFM</Button>
                <Button style={'buttonPrimary'} click={usfx}>USFX</Button>
                <Button style={'buttonSecondary'} click={back}>atras</Button>      
            </div> 
        </>}
        </div>
    </PageLayout>
    )
}
export default WithAuth(Edu)

