export const mockUsers = [
  {
    id: 1,
    username: "JohnDoe",
    email: "user@email.com",
    password: "Password123**",
    gamesPlayed: 50,
    wins: 30,
    losses: 20,
  },
  // Add more mock users as needed
];

export const mockGames = [
  { id: 1, name: "Poker", players: 6, difficulty: "Medium" },
  { id: 2, name: "Blackjack", players: 4, difficulty: "Easy" },
  { id: 3, name: "Bridge", players: 4, difficulty: "Hard" },
];

export type User = (typeof mockUsers)[0];
export type Game = (typeof mockGames)[0];

export const mockScores = [
  { id: 1, username: "JohnDoe", score: 1500, game: "Poker" },
  { id: 2, username: "JaneSmith", score: 1350, game: "Blackjack" },
  { id: 3, username: "BobJohnson", score: 1200, game: "Bridge" },
  { id: 4, username: "AliceWilliams", score: 1100, game: "Poker" },
  { id: 5, username: "CharlieBrown", score: 1000, game: "Blackjack" },
  { id: 6, username: "DavidMiller", score: 950, game: "Bridge" },
  { id: 7, username: "EvaGreen", score: 900, game: "Poker" },
  { id: 8, username: "FrankWhite", score: 850, game: "Blackjack" },
  { id: 9, username: "GraceHopper", score: 800, game: "Bridge" },
  { id: 10, username: "HenryFord", score: 750, game: "Poker" },
];

export type Score = (typeof mockScores)[0];


