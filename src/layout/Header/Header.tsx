import './Header.style.scss'

const Header = () => {
  return (
    <div className='header' data-testid='header'>
      <div className='container header__container'>
        <h3>Where in the world?</h3>
        {/* <button>Dark Mode</button> */}
      </div>
    </div>
  )
}

export default Header
