import React, { useState, useMemo, useContext} from 'react'

const UserContext = React.createContext()

export function UserProvider ({ children }) {

	const [user, setUser] = useState(undefined)
	const [userDB, setUserDB] = useState('loading')
	const [avatar, setAvatar] = useState(null)
	const [id, setId] = useState(null)
	const [progress, setProgress] = useState([])
	const [success, setSuccess] = useState(null)
	const [uniData, setUniData] = useState(null)
	const [simulacro, setSimulacro] = useState(null)

	function setUniversityData (data) {
		setUniData(data)
	}
	function setUserProfile (userProfile) {
		setUser(userProfile)
	}
	function setUserData (userDatabase) {
		setUserDB(userDatabase)
	}
	function setUserAvatar (userAvatar) {
		setAvatar(userAvatar)
	}
	function setTeacherId (uid) {
		setId(uid)
	}
	function setStudentsProgress (obj) {
		setProgress(obj)
	}
	function setUserSuccess (mode) {
		setSuccess(mode)
		setTimeout(()=>{ setSuccess(null)}, 4000)
	}
	function setUserSimulacro (obj) {
		setSimulacro(obj)
	}
	const value = useMemo(()=>{
		return ({
			uniData,
			user,
			userDB,
			avatar,
			id,
			progress,
			success,
			simulacro,
			setUniversityData,
			setUserProfile,
			setUserData,
			setUserAvatar,
			setTeacherId,
			setStudentsProgress,
			setUserSuccess,
			setUserSimulacro
		})
	}, [simulacro, uniData, avatar, user, userDB, id, success, progress])

	return (
		<UserContext.Provider value={value} >
			{ children }
		</UserContext.Provider>
	)
} 

export function useUser () {
	const context = useContext(UserContext)
	if(!context){
		throw new Error('error')
	}
	return context
}