import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Alignment, Fit, Layout, RiveState, StateMachineInput, useRive, UseRiveParameters, useStateMachineInput } from "rive-react";
import './LoginFormComponent.css'

const LOGIN_TEXT = 'Login'
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

    const [inputLookMultiplier, setInputLookMultiplier] = useState(0)
    const inputRef = useRef(null);

    useEffect(() => {
        if(inputRef?.current && !inputLookMultiplier){
            setInputLookMultiplier((inputRef.current as HTMLInputElement).offsetWidth / 100);
        }
    }, [inputRef]);
    
    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUserValue(newVal);
        if (!isCheckingInput!.value) {
          isCheckingInput!.value = true;
        }
        const numChars = newVal.length;
        numLookInput!.value = numChars * inputLookMultiplier;
    };

    const onUsernameFocus = () => {
        isCheckingInput!.value = true;
        if (numLookInput!.value !== userValue.length * inputLookMultiplier) {
          numLookInput!.value = userValue.length * inputLookMultiplier;
        }
    };

    const [loginButtonText, setLoginButtonText] = useState(LOGIN_TEXT)
    const onSubmit = (e: SyntheticEvent) => {
        setLoginButtonText('Checking...');
        setTimeout(() => {
          setLoginButtonText(LOGIN_TEXT);
          passValue === LOGIN_PASSWORD
            ? trigSuccessInput!.fire()
            : trigFailInput!.fire();
        }, 1500);
        e.preventDefault();
        return false;
      };

    
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
                                ref={inputRef}
                                placeholder="Username"
                                value={userValue}
                                onChange={onUsernameChange}
                                onFocus={onUsernameFocus}
                                onBlur={() => (isCheckingInput!.value = false)} 
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
                        <button className="login-btn">{loginButtonText}</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default LoginFormComponent