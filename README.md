# Player's Club: Online Card Game Platform #

Description: Where the best players come to play all the best games, nonstop!

## Background ##

This project started as an attempt to create a web-based playing card game for a unique South American Contract-Rummy game called Telefunkend. However as the game progressed and the scope of the project developed, it became apparent that the code I was writing was very generic enough that it could be used to implement various card games on a single platform. Thus the Player's Club was born- a platform for playing various multiplayer card games online with friends.
Currently the gaming functionality is still under construction, however, once the basic app skeleton and auth are rolled out, the first game that will be available will be Telefunken. Following this the plan is to implement Blackjack and Poker respectively, followed by a more challenging game like Pinochle.
It is my goal to also add challenging adversarial agents, once the basic multiplayer functionality is completed, however, this will be an incrementally added feature, that will take backseat to enhacing the existing multiplayer functionalit and gamer/user experience through optimization and/or architectural changes. 

## Requirements ##

1. **Mutliple Card Game Categories**

The platform will need to allow multiple users to log in and play from a selection of card games, each will include it's own specific client bundles and serverside state management logic. This is why using server-side renderign makes sense for this app, as it will allow the client bundles to be kept relatively small compared to the bundle size we would need to send for a client-rendered react version of the app. 
The games will all initially run in the same server, however, once initial development is completed and the first release deployed, we will need to begin planning on implementing individual game servers for each game that will each handle all the traffic for that card-game variation, depending on the traffic the server experiences and wether the current architecture can handle the bandwith.

2. **Multiplayer Gameplay**

The platform should allow for multiplayer games. The system should be capable of not only responding to user input in real time but also updating other players about the moves of other players accordingly with minimal delays, while maintaining the integrity of games by verifying the correct.
This will initially be accomplished by implementing a messaging system in which user actions are validated by the authorization server before they accepted and placed into the queue that manages the outward flow of messages, or rejected at which point the sender's client state will be considered invalid and softly reset, perhaps with a small read toast that signals the for the incident: client state differs from server. However, this should not be allowed to be a recurring issue and additional measures should be taken to ensure that all client states are up to date with the the server state for the vast majority of the time.

3. **Authorization Server Endpoints**

While users can simply receive other player's moves from the server, since the server is the trusted source of truth, we can't simply let users have the capability to arbitrarily make moves. Our game needs an authorization mechanism on the game state mutation functions so that we can address attempts to tamper with the state. One simple proposed solution is to use the gameState's `toMove` property to determine if the player sending the action to the server is in fact the user who's turn it is and who is in the target game to begin with. Other actions may be needed to constrain the contexts under which certain apis can be called to maintain fair and smooth gameplay.

4. **Leaderboards**

Each game will have stats recorded about it, so that we can display a Leaderboard feature that will allow player's to see how they stack up against other's on the app. The Leaderboard will hold data such as how many games a player has won, lost, and/or left. The winnings (for those games where players use chips to bet and eliminate others) and the losses wil also be listed so that users can analyze each other's strategies and eliminate theri own weknesses, and develop counterstrategies which will add another dimension to the game.

5. **Monetization With Game Chips**

We need to consider not only how we can monetize the game but also how we can encourage users to continue to play the game by allowing them to potentially monetize their wins and gameplay time. While this won't be immediately possible, we can implement a reward system based on game chips in which users must surrender a certain amount of chips per game played, and win a percentage (the payout) after each wind (perhaps we could also add 2nd and 3rd place prizes).
Users should be allowed to earn free chips, as well as buy and sell them back to the game store based on an exchange rate that reflects the total amount of money made from selling chips. (We will not implement this at first but it helps to know what we EVENTUALLY want to get to)
We could initially give players a certain amount of free chips and ecourage them to buy more by creating big stakes matches and making free chips increasingly rare, increasing the value of the paid ones. Other methods to monetize could be considered.

## Specifications ##

### System Architecture ###

- Main App: The intial release will utilize a serverless Next.JS app to serve server-rendered React components as well as client side child components for when interactivity is required (such as when rendering the game itself or when calling an api or fetching data on client is required). 
- Data Sources: The app will interact with two data sources: a Redis store for managing session data and the time-to-live counters that keep our sessions fresh, and one database for the rest of our data: the better-auth tables and our own game data storage. We should strongly considering separating the two and using a noSQL database for the game related schemas, such as MongoDB, Firestore, or Firebase Realtime Database.
- Authorization Server: To implement the server-side-validation of player actions, we will need to implement server-side only functions/hooks that will determine if a move is valid. Ideally if a player's move is valid, we should simply let it fail silently, unless doing so would cause a client/server state conflict, in which case we must push the current state back to the user and force their game to refresh as well as display an error message on the client side to alert them to why their gameplay was disturbed.
- Messaging: In order to implement the messaging feature and ensure reliable, on-time, and in-order delivery of all player action messages, we will use the Qstash service from Upstash. In order to deliver these messages we may initially simply allow the client app to poll the api, however, as our (or rather, if) application grows in scale, we can move to implementing a custom pub-sub service that allows us to control create new queues for every game instance or simply scale up the Qstash service by tapping into the Upstash Rest API.

### Data Model ###

Our database will need to contain the tables required by better-auth, which roughly correspond to the following typescript definitions:

#### BetterAuth Tables ####

```typescript
/** stores the account data **/
type Account = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    accessTokenExpiresAt: Date | number;
    refreshTokenExpiresAt: Date | number;
    scope?: string;
    passowrd?: string;
    createdAt: Date | numnber;
    updatedAt: Date | numnber;
};
/** stores the user data **/
type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
	image: string;
	createdAt: Date | number;
	updatedAt: Date | number;
	isAnonymous: boolean;
}
/** stores verification information **/
type Verification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: number | Date;
    createdAt?: number | Date;
    updatedAt?: number | Date;
};
```

Additionally we will need the following tables to keep track of the data for all games and players as they interact with the games and platforms:

#### Game-Specific Tables ####

```typescript
/** store individual card information **/
type Card = {
    id: string;
    rank: string;
    suit: sring;
    value: number;
    imageURL: string;
};
/** store data about a specific deck **/
type Deck = {
    id: string;
    count: number;
    size: number;
    createdAt: number | Date;
    updatedAt?: number | Date;
}
/** store a record of cards associated with a deck **/
type DeckCard = {
    deckId: string;
    cardId: string;
}
/** store pile of cards **/
type Pile = {
    id: string;
    count: number;
    variation?: string;
    createdAt: Date | number;
    udpateAt?: Date | number;
};
/** store recored of cars associated with a pile **/
type PileCard = {
    pileId: string;
    cardId: string;
}
/** The schema for game state json */
type GenericGameState = {
    remainingPlayers: number;
    toMove: string;
    lastMove: Date | number;
}
/** store the game instance **/
type Game = {
    id: string;
    state?: string;
    variation: string;
    deckId: string; // => Deck.id
    createdAt: Date | number;
    udpateAt?: Date | number;
}
/** store player information such as current game and state **/
type Player = {
    userId: string; // => User.id
    gameId?: string; // => Game.id
    points: number;
    status: string;
    displayName: string;
}
/** a record associating a card with a player **/
type PlayerCard = {
    playerId: string;
    cardId: string;
}
```

    
## Current Roadmap

- [ ] Implement Authentication
    - [x] Integrate BetterAuth
    - [x] Configure/Enhance BetterAuth
    - [ ] Implement Auth UI elements/pages

- [ ] Implement Data Layer
    - [x] Create sql tables, verify constraints and push schema to database(s)
    - [ ] Create data access layer fucntions
    - [ ] Verify data layer functionality

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

