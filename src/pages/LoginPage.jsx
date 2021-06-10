import React from 'react'
import Page from '../components/Page'
import './LoginPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons'
import fetch from 'node-fetch'
// import querystring from 'querystring'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            password: "",
            user: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.postUserLogin = this.postUserLogin.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async postUserLogin() {
        const body = {
            login: this.state.user,
            password: this.state.password
        }

        const result =  await fetch('https://moretask-fatec.herokuapp.com/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await result.json();
        if (result.status === 200) {
            localStorage.setItem('userToken', data.token);            
            this.props.history.push('/')
        }
        else            
            console.log(data.message);    
        
    }
    

    render() {    
        return (
            <Page 
            body={
            <div className="login">
                <h1>Login</h1>
                <div className="user">
                    <FontAwesomeIcon icon={faUserAlt}/>
                    <input 
                        type="text"
                        name="user"
                        value={this.state.user}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="password">
                    <FontAwesomeIcon icon={faKey}/>
                    <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="stay-loged">
                    <input 
                        type="checkbox"
                        name="remember"
                        checked={this.state.remember}
                        onChange={this.handleInputChange}/>
                    <p>Mantenha-se logado</p>
                </div>
                <button onClick={this.postUserLogin}>Logar</button>
            </div>}>
            </Page>
        )
    }
}

export default LoginPage