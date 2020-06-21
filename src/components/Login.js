import React from "react"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "twoje hasło",
    }
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.input)
  }

  render() {
    const { alert } = this.props;
    return (
      <div className='login_block'>
        <form onSubmit={this.handleSubmit}>
          <input className="input_field" type='text' name='password' placeholder="hasło" onChange={this.handleChange} />
          <input className="submit" type='submit' value='Wejdź' />
          {alert && (<p className="pass_alert">Nieprawidłowe hasło</p>)}
        </form>
      </div>
    )
  }
}

export default Login
