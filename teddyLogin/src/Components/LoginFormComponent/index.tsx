import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Alignment, Fit, Layout, RiveState, StateMachineInput, useRive, UseRiveParameters, useStateMachineInput } from "rive-react";
import './LoginFormComponent.css'

const LOGIN_PASSWORD = 'teddy';
const STATE_MACHINE_NAME = 'Login Machine';

function LoginFormComponent(riveProps: UseRiveParameters = {}){
    const {rive: riveInstance, RiveComponent}: RiveState = useRive({
        src: './login-teddy.riv',
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
        layout: new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
    }),
    ...riveProps,
    });

    const [userValue, setUserValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const isCheckingInput: StateMachineInput | null = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'isChecking'
    );

    const numLookInput: StateMachineInput | null = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'numLook'
    );

    const trigSuccessInput: StateMachineInput | null = useStateMachineInput(
        riveInstance,
        STATE_MACHINE_NAME,
        'trigSuccess'
    );

    const trigFailInput: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'trigFail'
    );

    const isHandsUpInput: StateMachineInput | null = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'isHandsUp'
    );


    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUserValue(newVal);
    }

    const onSubmit = (e: SyntheticEvent) => {};

     return(
        <div className="login-form-component-root">
            <div className="login-form-wrapper">
                <div className="rive-wrapper">
                    <RiveComponent className="rive-container"/>
                </div>
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
                                onFocus={() => (isHandsUpInput!.value = true)}
                                onBlur={() => (isHandsUpInput!.value = false)}
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