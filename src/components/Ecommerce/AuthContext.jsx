import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { fetchBackend } from '../shared/fetchBackend'

const AuthContext = createContext(null)
const STORAGE_KEY = 'shoply-user-v1'
const USERS_KEY = 'shoply-local-users-v1'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const getLocalUsers = useCallback(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }, [])

  const login = useCallback(
    async (email, password) => {
      const backend = await fetchBackend('ecommerce', 'users')
      const demo = backend.demoAccounts ?? []
      const local = getLocalUsers()
      const all = [...demo, ...local]
      const match = all.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password,
      )
      if (!match) {
        throw new Error('Invalid email or password')
      }
      const session = {
        email: match.email,
        name: match.name,
        loggedInAt: new Date().toISOString(),
      }
      setUser(session)
      return session
    },
    [getLocalUsers],
  )

  const register = useCallback(
    async ({ name, email, password }) => {
      const cleanEmail = email.trim().toLowerCase()
      if (!name.trim() || !cleanEmail || password.length < 6) {
        throw new Error('Name, email, and password (6+ chars) are required')
      }

      const backend = await fetchBackend('ecommerce', 'users')
      const demo = backend.demoAccounts ?? []
      const local = getLocalUsers()
      const exists = [...demo, ...local].some(
        (u) => u.email.toLowerCase() === cleanEmail,
      )
      if (exists) {
        throw new Error('An account with this email already exists')
      }

      const next = [
        ...local,
        { name: name.trim(), email: cleanEmail, password },
      ]
      localStorage.setItem(USERS_KEY, JSON.stringify(next))

      const session = {
        email: cleanEmail,
        name: name.trim(),
        loggedInAt: new Date().toISOString(),
      }
      setUser(session)
      return session
    },
    [getLocalUsers],
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
