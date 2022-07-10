import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser, setUniversityData} from '../context/Context.js'
import PageUserLayout from '../layouts/PageUserLayout'
import { WithAuth } from '../HOCs/WithAuth'
import { userDataUpdate, getFac } from '../firebase/utils'
import Subtitle from '../components/Subtitle'
import BlackFont from '../components/BlackFont'
import Button from '../components/Button'
import style from '../styles/Facultad.module.css'


function Facultad (props) {
    const router = useRouter()
    const {userDB, uniData, setUniversityData, setUserData} = useUser()

    const [fac, setFac] = useState(null)
    const [facDB, setFacDB] = useState(null)


    function continuar () {
        if(fac !== null){
            const object = {
                fac,
                facDB,
            }
            userDataUpdate(object, setUserData)  
            router.push('/Carrera')
        } 
    }
    function back () {
        router.back()
    }

    function setFacData (fac, facDB) {
        setFac(fac)
        setFacDB(facDB)
	}
    console.log(uniData)
    console.log(userDB)

    useEffect(() => {
        userDB.university ? getFac(userDB.university, setUniversityData): ''
    }, [userDB]);
    return (
    <PageUserLayout className={style.container}>
        <div className={style.container}>
            <Subtitle>Elije tu facultad</Subtitle>
       
            {uniData? 
            <BlackFont>
                <ul className={style.list}>
                {Object.keys(uniData.fac).map((f, i)=><li className={`${style.li} ${f == facDB ? style.active : ''}`} key={i} onClick={()=>setFacData(uniData.fac[f].facName, f)}>{uniData.fac[f].facName}</li>)}   
                </ul> 
                <div className={style.buttonsContainer}>
                <Button style={'buttonSecondary'} click={back}>atras</Button> 
                <Button style={'buttonPrimary'} click={continuar}>continuar</Button>    
            </div>
            </BlackFont>
            : ''}
           
        </div>
    </PageUserLayout>
    )
}


export default WithAuth(Facultad)

