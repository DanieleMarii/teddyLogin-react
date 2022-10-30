import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { UseRiveParameters } from "rive-react";
import './LoginFormComponent.css'

const LOGIN_PASSWORD = 'teddy';

function LoginFormComponent(riveProps: UseRiveParameters = {}){
    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUserValue(newVal);
    }

    const onSubmit = (e: SyntheticEvent) => {};

     return(
        <div className="login-form-component-root">
            <div className="login-form-wrapper">
                <div className="form-container">
                    <form onSubmit={onSubmit}>
                        <label>
                            <input 
                                type="text"
                                className="form-username"
                                name="username"
                                placeholder="Username"
                                value={userValue}
                                onChange={onUsernameChange} 
                            />
                        </label>
                        <label>
                            <input 
                                type="password"
                                className="form-pass"
                                name="password"
                                placeholder="Password (shh.. it's 'teddy')"
                                value={passValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPassValue(e.target.value)
                                }
                            />
                        </label>
                        <button className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default LoginFormComponent