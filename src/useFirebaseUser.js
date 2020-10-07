import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const useFirebaseUser = () => {
  const [user, setUser] = useState()
  const [initialized, setInitialized] = useState(false)

  function onChange(firebaseUser) {
    setUser(firebaseUser)
    setInitialized(true)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    return () => unsubscribe()
  }, [])

  return {
    user,
    initialized,
  }
}

export default useFirebaseUser
