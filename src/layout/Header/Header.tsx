import './Header.style.scss'

const Header = () => {
  return (
    <div className='header' data-testid='header'>
      <div className='container header__container'>
        <h2>Where in the world?</h2>
        {/* <button>Dark Mode</button> */}
      </div>
    </div>
  )
}

export default Header
