import React from 'react';

export default function EmojiShop() {
    return (
        <div id="emojishop">
            <button className="buy-button" id="buy1">
                <span><img className="currency" src="/Pictures/Game/UI/emotes.webp" alt="github link"/> 1000<br />suprised</span>
                <img className="shop-icon" src="/Pictures/Game/Emote/surprised-emote.webp" alt="surprised emote"/>
            </button>
            <button className="buy-button" id="buy2">
                <span><img className="currency" src="/Pictures/Game/UI/emotes.webp" alt="github link"/> 2000<br />joyful</span>
                <img className="shop-icon" src="/Pictures/Game/Emote/joyful-emote.webp" alt="joyful emote"/>
            </button>
            <button className="buy-button" id="buy3">
                <span><img className="currency" src="/Pictures/Game/UI/emotes.webp" alt="github link"/> 4000<br />asian</span>
                <img className="shop-icon" src="/Pictures/Game/Emote/ching-chong-emote.webp" alt="ching chong emote"/>
            </button>
        </div>
    )
}