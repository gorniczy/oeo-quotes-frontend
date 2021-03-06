import React from "react"
import "./App.css"
import Header from "./components/Header"
import Quote from "./components/Quote"
import Login from "./components/Login"
import Navbar from "./components/Navbar"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      results: null,
      numOfQuotes: 1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.loggedIn !== this.state.loggedIn &&
      this.state.loggedIn === true
    ) {
      this.fetchData(this.state.numOfQuotes)
    }
  }

  fetchData = (num) => {
    fetch(`https://oeo-quotes-backend.herokuapp.com/quotes-${num}`)
      .then((response) => response.json())
      .then((payLoad) => {
        this.setState({
          results: payLoad.results,
        })
      })
  }

  login = (input) => {
    fetch("https://oeo-quotes-backend.herokuapp.com/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "hello user") {
          this.setState({
            loggedIn: true,
          })
        } else {
          this.setState({
            passAlert: "nieprawidłowe hasło",
          })
        }
      })
      .catch((err) => console.log(err))
  }

  updateNum = () => {
    this.setState({
      numOfQuotes: this.state.numOfQuotes === 1 ? 2 : 1,
    })
  }

  render() {
    const { loggedIn, results, numOfQuotes } = this.state

    return (
      <div className='App'>
        <Header />

        {loggedIn && results ? (
          <React.Fragment>
            <main>
              {results.map((element, i) => {
                return (
                  <Quote
                    key={i}
                    fragment={results[i][5]}
                    authorContent={results[i][2]}
                    nameContent={results[i][1]}
                    locationContent={results[i][4]}
                    commentContent={results[i][6]}
                  />
                )
              })}
            </main>
            <Navbar
              fetchData={this.fetchData}
              updateNum={this.updateNum}
              numOfQuotes={numOfQuotes}
            />
          </React.Fragment>
        ) : (
          <Login login={this.login} alert={this.state.passAlert} />
        )}
      </div>
    )
  }
}

export default App
