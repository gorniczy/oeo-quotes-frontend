import React from "react"
import "./App.css"
import refresh from './img/refresh.svg'
import Header from './components/Header'
import Quote from './components/Quote'
import Login from './components/Login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      fragment: "",
      authorContent: "",
      nameContent: "",
      locationContent: "",
      commentContent: "",
      tagsContent: ""
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loggedIn !== this.state.loggedIn && this.state.loggedIn === true) {
      this.fetchData()
    }
  }

  fetchData = () => {
    fetch("https://oeo-quotes-backend.herokuapp.com/data")
    .then((response) => response.json())
    .then((payLoad) => {
      this.setState({
        fragment: payLoad[0].fragment,
        authorContent: payLoad[0].author,
        nameContent: payLoad[0].name,
        locationContent: payLoad[0].location,
        commentContent: payLoad[0].comment,
        tagsContent: payLoad[0].tags,
        passAlert: ''
      })
    })
  }

  login = (input) => {
    fetch("https://oeo-quotes-backend.herokuapp.com/login", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: input
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === "hello user") {
          this.setState({
            loggedIn: true
          })
        }
        this.setState({
          passAlert: 'nieprawidłowe hasło'
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const {
      loggedIn,
      fragment,
      authorContent,
      nameContent,
      locationContent,
      commentContent
    } = this.state

    return (
      <div className='App'>
        <Header />
        {loggedIn
          ? <React.Fragment>
              <Quote
              fragment={fragment}
              authorContent={authorContent}
              nameContent={nameContent}
              locationContent={locationContent}
              commentContent={commentContent}
              />
              <img onClick={() => this.fetchData()} className='button_refresh' src={ refresh } alt=""></img>
            </React.Fragment>
          : <Login login={this.login} alert={this.state.passAlert}/>
        }
      </div>
    )
  }
}

export default App
