import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "./button/Button";
import './app.css';

const ids = ["a","b","c","d"];

export default function App() {
    const [ activeId, setActiveId ] = useState('');
    const [ sequence, setSequence ] = useState('');
    const [ answer, setAnswer ] = useState('');
    const [isDisabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const virtualClick = async () => {

        const promise = new Promise((resolve) => {
            setTimeout(() => {
                setActiveId(ids[Math.floor(Math.random() * 4)]);
            }, 1000);
            setTimeout(() => {
                setActiveId('');
                resolve();
            }, 1200);
        });

        setDisabled(true);
        await promise.then(() => {});
        setDisabled(false);
    };

    useEffect(() => {
        if (answer.length === sequence.length && answer !== '' && sequence !== '') {
            if (answer === sequence) {
                setAnswer('');
                virtualClick().then();
            } else {
                navigate('/go');
            }
        }
    }, [answer, sequence]);

    useEffect(() => {
        virtualClick().then();
    }, []);


    useEffect(() => {
        setSequence((sequence) => sequence + activeId);
    }, [activeId]);

    return (
        <div className={"app"}>
            <div className={"score"} >Score: { sequence.length-1 }</div>
            <div className={"buttons"}>
                {
                    ids.map((char, i) => {
                        return <Button
                            isDisabled={isDisabled}
                            answer={answer}
                            sequence={sequence}
                            setAnswer={setAnswer}
                            virtualClick={ virtualClick }
                            key={i}
                            id={char}
                            isActive={char === activeId} />
                    })
                }
            </div>
            <div className={"rating"} ><div>Rating table</div></div>
        </div>
    );
}