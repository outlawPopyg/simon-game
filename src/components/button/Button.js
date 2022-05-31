import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import './button.css';
import useSound from "use-sound";


export default function Button({ id = '', isActive = false, setAnswer, isDisabled, soundFile }) {
    const [isPressed, setPressed] = useState(false);
    const [aSound,bSound,cSound,dSound] = soundFile;
    const [ a ] = useSound(aSound);
    const [ b ] = useSound(bSound);
    const [ c ] = useSound(cSound);
    const [ d ] = useSound(dSound);

    useEffect(() => {
        if (isActive) {
            switch (id) {
                case 'a':
                    a();
                    break;
                case 'b':
                    b();
                    break;
                case 'c':
                    c();
                    break;
                case 'd':
                    d();
                    break;
                default:
                    break;
            }
        }
    }, [isActive])

    return <button
        disabled={isDisabled}
        onClick={() => {
            switch (id) {
                case 'a':
                    a();
                    break;
                case 'b':
                    b();
                    break;
                case 'c':
                    c();
                    break;
                case 'd':
                    d();
                    break;
                default:
                    break;
            }
            setAnswer((answer) => answer + id);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={(e) => {
            if (isDisabled) {
                e.preventDefault();
            } else {
                setPressed(true);
            }
        }}
        onTouchEnd={() => setPressed(false)}
        className={cn("button", id, {
            "active": isPressed || isActive
        })} />
}