# **Virtual Friend**

> [!NOTE]
> Make sure to check out the [notes](/For%20Class/notes.md)!

## Elevator Pitch

Have you ever wanted to make a new friend without having to go outside? Or maybe your mobility is impaired? Virtual Friend Network makes it easy to create new bonds that will last a lifetime. Connect to the Virtual Friend Network, and interact with others. Join each other on adventures such as eating at a cafe, going shopping for hats, or even jumping on a trampoline, all within the comfort of your own home!

## Design

Login Page

![Login Page](/Pictures/Planning/VFLoginPage.jpeg)

Register Page

![Register Page](/Pictures/Planning/VFRegisterPage.jpeg)

Gameplay Page

![Gameplay Page](/Pictures/Planning/VFGameplayPage.jpeg)

Settings Page

![Settings Page](/Pictures/Planning/VFSettingsPage.jpeg)

## Key Features
### Base Features
- Secure login over HTTPS
- Upon account creation, character creator will be initiallized
  - Can come back to character creator any time
  - Character creator will be made up of...
    - Hair
    - Skin color
    - Face
    - Gender
- Profile details will be saved/loaded
  - Profile name
  - Profile cosmetics
  - Profile character creation
- Ability to see others realtime
- Ability to see total players online
- An emoji dialogue system
  - Similar to Fortnites emoting wheel except with emojis
- Ability to move to different buildings
  - Clothes store
  - Trampoline area
  - Cafe
  - Changing room

### Non Essential Features
- Working for money
  - Specific area catered to minigames which will provide currency
  - Extremely simple, to keep the game realistic
  - Potentially multiplayer minigames
- Audio output for client inputs

## Technologies (SUBJECT TO CHANGE)

- **HTML** - A clean and clearly defined HTML page
  - 4 HTML pages
    - [Login Page](/Pictures/Planning/VFLoginPage.jpeg)
    - [Register Page](/Pictures/Planning/VFRegisterPage.jpeg)
    - [Gameplay Page](/Pictures/Planning/VFGameplayPage.jpeg)
    - [Settings Page](/Pictures/Planning/VFSettingsPage.jpeg)
- **CSS** - A minimalistic yet intuitive approach to...
  - The usage of color theory
  - A simple pixel art + vectorized combination look
    - Game graphics in pixel art, imported through JS
  - A clearly defined font which is clean and legible
  - Beveled edges on UI elements
- **JavaScript** - For backend, provides gameplay graphics to clients, as well as backend for serverside
- **Service** - Will provide backend service endpoints for...
  - Logging in
  - Registration
  - **TODO** (Not fully sure what service is used for yet, just that it is a request and recieve model)
- **DB** - Will provide a storing point for all game data. This will include...
  - Player character
  - Player currency amount
  - Credentials
    - Username
    - Password
    - If no credentials are stored, show window for registration
- **Web Socket** - Provides a communication system from client to server. Will potentially be a single socket per client game. Packet types will include...
  - Player XY position (player inputs will be clientsided)
  - Player character changes
  - Player Dialogue Emojis
- **React** - Port the application to React, to provide a more complex and efficient system

## HTML Deliverable

> - [x] TODO
> - [x] Finish login page
> - [x] Finish register page
> - [x] Finish gameplay page
> - [x] Finish settings page
> - [x] EXTRA Finish leaderboard page
> - [x] Correctly structured
> - [x] Links to different pages
> - [x] Link to GitHub (Clickable link through GitHub image link in footer)
> - [x] 3rd party app placeholder (bottom of leaderboard page)
> - [x] application images (bottom of leaderboard page)
> - [x] Login placeholder
> - [x] Register placeholder
> - [x] Database representation placeholder (leaderboard page)
> - [x] Websocket placeholder (The game page)
> - [x] Consistency in code


## CSS Deliverable

> - [x] TODO
> - [x] Finish login CSS
> - [x] Finish register CSS
> - [x] Finish gameplay CSS
> - [x] Finish settings CSS (apart from backend side)
> - [x] Finish leaderboard page CSS
> - [x] Proper usage of header
> - [x] Proper usage of main
> - [x] Proper usage of footer
> - [x] Usage of flex
> - [x] Responsive to window resizing
> - [x] Proper styling of elements
> - [x] Proper styling of text
> - [x] Proper styling of image (shown in leaderboard and footer)
> - [x] Usage of CSS animation
> - [x] Usage of CSS transitions

## JavaScript Deliverable

> - [x] TODO
> - [x] Future login support
> - [x] Future database support
> - [x] Future websocket support
> - [x] Proper JavaScript support
> - [x] Interactable settings
> - [x] Changable settings depending on logged in user
> - [x] Dark mode setting support
> - [x] Fully functioning login page
> - [x] Fully functioning register page
> - [x] Leaderboard changes depending on stored user data
> - [x] CSS and JavaScript synchronization through CSS variables
> - [x] Proper implementation of emojis system
> - [x] Proper implementation of image preloading
> - [x] Proper implementation of player movement
> - [x] Usage of multiple file pathing to create clean environment
> - [x] Finish Javascript Polish
> - [x] Commented JavaScript code for future reference

## Service Deliverable

> - [x] TODO
> - [x] HTTP service using Node.js and Express
> - [x] Frontend served up using Express static middleware
> - [x] Frontend calls third party service endpoints
> - [x] Backend provides service endpoints
> - [x] Frontend calls your service endpoints
> - [x] Account Backend connecting
> - [x] Leaderboard connected to backend
> - [x] Different files for routing for more organised code
> - [x] Auto login using localStorage

## DB Deliverable

> - [x] TODO
> - [x] Supports new user registration
> - [x] Supports existing user authentication
> - [x] Stores application data in MongoDB
> - [x] Stores and retrieves credentials in MongoDB
> - [x] Restricts application functionality based upon authentication


## Web Socket Deliverable

> - [ ] TODO

## React Deliverable

> - [ ] TODO
