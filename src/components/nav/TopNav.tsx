import '../../styles/top-nav.scss'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../utils/auth'
import { useState, useEffect, useRef } from 'react'

const TopNav = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(getCurrentUser())
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    setIsDropdownOpen(false)
    logout()
    navigate('/')
  }

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="top-nav-main">
      <div className="top-nav-main__left">
        <img src="/images/logo.svg" alt="logo" className="top-nav-main__logo" />
      </div>
      <div className="top-nav-main__search">
        <input type="search" placeholder="Search for anything" className="top-nav-main__search-input" />
        <button className="top-nav-main__search-button">
          <img src="/images/icons/search-icon.svg" alt="search" />
        </button>
      </div>
      <div className="top-nav-main__right">
        <Link to="#" className="top-nav-main__docs">Docs</Link>
        <img src="/images/icons/bell.svg" alt="notify" className="top-nav-main__notification" />
        <div 
          className="top-nav-main__profile" 
          ref={dropdownRef}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <div 
            className="top-nav-main__profile-content"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img src="/images/avatar.svg" alt="avatar" className="top-nav-main__profile-avatar" />
            <p className="top-nav-main__profile-name">{user?.name || 'User'}</p>
            <img src="/images/icons/dropdown-icon.svg" alt="Dropdown" className="top-nav-main__profile-dropdown" />
          </div>
          {isDropdownOpen && (
            <div className="top-nav-main__profile-menu">
              <button 
                className="top-nav-main__profile-menu-item"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopNav