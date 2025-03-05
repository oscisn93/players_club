# Players Club Client App

This is the client application. It will host the main website as well as the game.
The plan is to create the games in the following order:

1. [Telefunken](https://www.coololdgames.com/card-games/rummy/contract/telefunken)\*
2. Blackjack
3. Poker

Other games that may be considered:

- Solitaire
- Hearts
- Spades
- Pinochle

Especially likely will be Solitaire as it will give users a single player option to use while the agents are developed for the multiplayer games.

## Getting Started

To get started, you must have nodejs installed on your system (version 20 or higher should work), as well as pnpm.
If you use the `nix` package manager or operating system, this game comes equiped with a `shell.nix` file. To create a development environment with all required dependencies, run the `nix-shell` command inside the `/client` directory.

You will then need to create a few environment variables. The following checklist describes the environment setup:

1. Create a .env file in the `/client` directory. You may copy or simply rename the included `.env.development` file and fill in the included variables.
2. Firts you will need to create a [Turso](https://app.turso.tech) database. This will require [creating an account](https://app.turso.tech/signup). From there, navigate to https://app.turso.tech/<your-username>/databases and create a group. Once you have a group, create a database. Once you have a database, you can get the url and create a token. The URL will be the value assigned to `TURSO_DATABASE_URL` and the token to the variable `TURSO_AUTH_TOKEN`. **NOTE: alternatively, consider using the [turso-cli](https://docs.turso.tech/cli/introduction), which is included in the nix shell.**
3. Next, you will need to create a Redis instance on Upstash. This will be used by BetterAuth to store sessions and keep track of time to live counters which keep our sessions up to date. As before you will need to [create an Upstash account](https://console.upstash.com/login). This will allow you to create a redis database. Once you do you will need two things: the database endpoint url which will be assigned to `UPSTASH_REDIS_URL`, and the password which will be asssigned to `UPSTASH_AUTH_TOKEN`.
4. Next we need some variables for our BetterAuth integration. Go to [the BetterAuth website's Installation section](https:www//better-auth.com/docs/installation), and look for the **Set Environment Variables** section and click on the "Generate Secret" button and quckly copy the value. This will be the value assigned to the `BETTER_AUTH_SECRET` variable. As for the `BETTER_AUTH_URL` variable, you can set this to `http:/localhost:3000` in your local configuration.
5. Finally we need to create a [GitHub Oauth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). Once completed assign the client id to `GITHUB_CLIENT_ID` and generate a token to assign to `GITHUB_CLIENT_SECRET`. You are now ready to try out the app in development mode!

...well almost! There's one more step!

You must push your database schema so that the necessary tables are available on your Turso database. To accomplish this, the T3 template gives us a helpful npm script

```bash
pnpm db:push
```

This ensures that your database has all the same tables as the database from the previous commit.

However, let's say you later make changes to the auth instance, such as adding a plugin. This may require us to alter the auth tables, and you will first need to regenerate the auth schema file using the better-auth cli generate script:

```bash
pnpm dlx @better-auth/cli generate
```

This will generate a drizzle schema that matches the tables expected by the better-auth api. You can then use the

```bash
pnpm db:generate
```

script to create a migration, followed by

```bash
pnpm db:migrate
```

to push your changes to the remote database!

To run the development server, run

```bash
pnpm dev
```

## Planned Changes

TODO: Create more resource agnostic development environment with local redis and sqlite support for lower-latency during development.

## Notes

\*Telefunken is a Rummy-like card game popular in South America. The goal, like in most Rummy games, is to be the first to empty the cards from your hand by forming sets and sequences in accordance with the current contract. When a player wins a round or deal the remaining players get penalty points equivalent to the total value of the cards in their hand. At the end of 7 deals, the player with theleast penalty points wins!
