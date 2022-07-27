import './HomePage.style.scss'

const HomePage = () => {
  return (
    <div className='home-page' data-testid='home-page'>
      <div className='container home-page__container'>
        <div className='home-page__countries-list' data-testid='countries-list'></div>
      </div>
    </div>
  )
}

export default HomePage
