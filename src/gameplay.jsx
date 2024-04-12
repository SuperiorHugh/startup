/*-- imports --*/

import React, { useEffect } from 'react';
import EmojiShop from './emojishop';

//gameplay: body component of gameplay page
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
        return () => {
            const script = document.querySelector('script[src="virtual-friend/virtualfriend.js"]');
            if (script) {
                document.body.removeChild(script);
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