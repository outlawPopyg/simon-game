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
    const [soundFile, setSoundFile] = useState(null);
    const [soundFileIsLoaded, setSoundFileIsLoaded] = useState(false);
    const navigate = useNavigate();

    const virtualClick = async () => {

        const promise = new Promise((resolve) => {
            setTimeout(() => {
                setActiveId(ids[Math.floor(Math.random() * 4)]); // генерация ID(0-3)
            }, 1000);
            setTimeout(() => {
                resolve(); // тут промис завершает работу
            }, 1200);
        });

        setDisabled(true); // конопка заблокирована пока работает промис
        await promise.then(() => setActiveId('')); // затираем ID активной кнопки
        setDisabled(false); // кнопка снова активна
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
        const aSound = require('../sounds/a.mp3');
        const bSound = require('../sounds/b.mp3');
        const cSound = require('../sounds/c.mp3');
        const dSound = require('../sounds/d.mp3');

        setSoundFile([aSound,bSound,cSound,dSound]);
        setSoundFileIsLoaded(true);
    }, []);

    useEffect(() => {
        if (soundFileIsLoaded) {
            virtualClick().then();
        }
    }, [soundFileIsLoaded]);


    useEffect(() => {
        setSequence((sequence) => sequence + activeId);
    }, [activeId]);

    if (!soundFileIsLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className={"app"}>
            <div className={"score"} >Score: { sequence.length-1 }</div>
            <div className={"buttons"}>
                {
                    ids.map((char, i) => {
                        return <Button
                            soundFile={soundFile}
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