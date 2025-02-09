# players_club

Where the best players come to play all the best games, nonstop!

## Background

This project started as an attempt to create a web-based playing card game for a unique South American Contract-Rummy game called Telefunkend.
However as the game progressed and the scope of the project developed, it became apparent that the code I was writing was very generic enough that it could be used to implement various card games on a single platform.
Thus the Player's Club was born- a platform for playing various multiplayer card games online with friends. Currently the gaming functionality is still under construction, however, once the basic app skeleton and auth are rolled out, the first game that will be available will be Telefunken, followed by Blackjack and Poker respectively. It is my goal to also add challenging adversarial agents, once the basic multiplayer functionality is completed, however this will be an incrementally added feature that will be game specific- as some games require agents that are beyond the scope of the author's current skill level to implement at the moment, however if the project is successful this will add insentives to research and develop an adequate solution and build upon said solution as the project gains traction (or rather shall I say, IF it gains traction!). The project was developed using the T3-stack starter template, Better-Auth for authentication, and the game will make use of the p5.js library for rendering game objects and animations.

## Current Roadmap

- [ ] Implement Authentication
    - [ ] Integrate BetterAuth
    - [ ] Configure/Enhance BetterAuth
    - [ ] Implement Auth UI elements/pages

- [ ] Implement Data Layer
    - Create sql tables, verify constraints and push schema to database(s)
    - Create data access layer fucntions
    - Verify data layer functionality

- [ ] Implement Server Messaging & Authorization
    - [ ] Create messaging api to allow players to push and receive updates
    - [ ] Use server functions to verify user moves and maintain integrity of game state
    - [ ] Determine if polling is sufficient, if not try SSE, and finally WS for keeping state up to date

- [ ] Implement Telefunken Game
    - [ ] Design Game Visuals
    - [ ] Create Game Cofinfiguration
    - [ ] Implement Game Logic
    - [ ] Test/Verify Gameplay
    - [ ] Enhance Game with Animations
    - [ ] Test/Get Feedback on Gameplay

