import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser, setUniversityData} from '../context/Context.js'
import PageLayout from '../layouts/PageLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { userDataUpdate, getFac } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import BlackFont from '../components/BlackFont'
import Button from '../components/Button'
import style from '../styles/Facultad.module.css'
import { firebaseConfig } from '../firebase/config.js'


function Carrera () {

    const router = useRouter()
    const {userDB, uniData, setUniversityData, setUserData} = useUser()
    const [career, setCareer] = useState(null)

    function continuar () {
        if(career !== null){
            const materiasDB = uniData.fac[userDB.facDB].materias
            const obj = materiasDB.reduce(function(target, key, index) {
                target[key] = false
                return target;
              }, {})

            userDataUpdate({
                subjects: obj
            }, setUserData)  
            router.push('/Home')
        } 
    }

    function back () {
        router.back()
    }

    function setCareerData (c) {
        setCareer(c)
    
	}

    console.log(uniData)
    console.log(userDB.facDB)

    useEffect(() => {
        userDB.university ? getFac(userDB.university, setUniversityData): ''
    }, [userDB, career]);
    return (
    <PageLayout>
        {userDB.facDB && <div className={style.container}>
            <Subtitle>Elije tu facultad</Subtitle>
            {uniData && userDB? 
                <BlackFont> 
                    <ul className={style.list}>
                        { uniData.fac[userDB.facDB].carreras.map((c, i) => <li className={`${style.li} ${c == career ? style.active : ''}`} key={i} onClick={() => setCareerData(c)}>{c}</li>) }
                    </ul>
                </BlackFont>
            : ''}
            <div className={style.buttonsContainer}>
                <Button style={'buttonSecondary'} click={back}>atras</Button> 
                <Button style={'buttonPrimary'} click={continuar}>continuar</Button>    
            </div>
        </div>}
    </PageLayout>
    )
}


export default WithAuth(Carrera)

