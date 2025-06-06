import './App.css'
import icon from './assets/Group 13.png'

function Header() {
  return (
    <div className='head'>
    <header className="App-header">
        <div><img src= {icon} alt="logo" /></div>
        <div><h1>SPOTS</h1></div>
    </header>
    </div>
  )
}

export default Header
