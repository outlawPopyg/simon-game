import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
// import sound from '../../sounds/c.mp3';
import useSound from "use-sound";
import './Menu.css';

export default function Menu() {
    const [soundFile, setSoundFile] = useState(null);
    const [soundFileisLoaded, setSoundFileIsLoaded] = useState(false);

    useEffect(() => {
        const sound = require("../../sounds/a.mp3");
        setSoundFile(sound);
        setSoundFileIsLoaded(true);
    }, []);

    const [s] = useSound(
        soundFile,
        {volume: 0.0001}
    );

    if (!soundFileisLoaded) {
        return <p>Loading...</p>;
    }


    return (
        <div className={"wrapper"}>
            <h1 className={"title"}>Simon game</h1>
            <div className={"menu"}>
                <div className={"start"}>
                    <Link onClick={() => s()} to={"/app"}>Start</Link>
                </div>
                <div className={"info"}>
                    <Link to={"/info"}>Rules</Link>
                </div>
            </div>
        </div>
    );
}