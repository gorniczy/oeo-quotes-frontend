import React from "react"
import refresh from "../img/refresh.svg"

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { fetchData, updateNum, numOfQuotes } = this.props
    return (
      <nav>
        <div className='nav-item'></div>
        <div className='nav-item'></div>

        <div className='nav-item num-of-quotes' onClick={updateNum}>
          x{numOfQuotes}
        </div>
        <div className='nav-item' onClick={() => fetchData(numOfQuotes)}>
          <img className='button_refresh' src={refresh} alt=''></img>
        </div>
      </nav>
    )
  }
}

export default Navbar
