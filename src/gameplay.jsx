import React, { useEffect } from 'react';
import EmojiShop from './emojishop';

export default function Gameplay() {

    useEffect(() => {
        console.log('load gameplay')
        const loadScript = async () => {
            const script = document.createElement('script');
            script.src = `virtual-friend/virtualfriend.js`;
            script.type = 'module';
            document.body.appendChild(script);
        }

        loadScript();
        console.log('connected scr')// create new game obj
        return () => {
            console.log('disconnected scr')
            const script = document.querySelector('script[src="virtual-friend/virtualfriend.js"]');
            if (script) {
                document.body.removeChild(script);// end game obj and delete
                
            }
        }
    }, []);

    return (
        <main>
            <div id="screen-wrapper">
                <canvas id="screen"></canvas>
            </div>
            
            <EmojiShop />
        </main>
    );
}