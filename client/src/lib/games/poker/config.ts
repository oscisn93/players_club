type BaseCard = {
  rank: string;
  suit: string;
};

function getPokerOrder(rank: string) {
  const idx = [
    "A",
    "K",
    "Q",
    "J",
    "0",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ].indexOf(rank);
  return 14 - idx;
}

function isRoyalFlush(cards: BaseCard[]) {
  const ranks = ["A", "K", "Q", "J", "0"];
  if (ranks.indexOf(cards[0].rank) === -1) {
    return false;
  }
  return isFlush(cards);
}

function isStraightFlush(cards: BaseCard[]) {
  return isFlush(cards) && isStraight(cards);
}

function isFlush(cards: BaseCard[]) {
  const suit = cards[0].suit;
  return (
    cards.reduce((count, cur) => {
      return cur.suit === suit ? count + 1 : count;
    }, 0) === 5
  );
}

function getRankCounts(cards: BaseCard[]) {
  const counts: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    const rank = cards[i].rank;
    if (!counts[rank]) {
      counts[rank] = 1;
    }
    else counts[rank]++;
  }
  return Object.values(counts)
}

function isFourOfAKind(cards: BaseCard[]) {
  return getRankCounts(cards).indexOf(4) !== -1
}

function isFullHouse(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.length === 2 && 
    (counts[0] === 2 || counts[0] === 3)
}

function isThreeOfAKind(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.indexOf(3) !== -1;
}

function isTwoPair(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.reduce((prev, cur) => {
    return prev + cur
  }) === 5;
}

function isPair(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.reduce((prev, cur) => {
    return prev + cur
  }) === 6;
}

function isStraight(cards: BaseCard[]) {
  const sortedRanks = cards
    .map((card) => getPokerOrder(card.rank))
    .sort((a, b) => a - b);
  const final = sortedRanks.reduce((prev, cur) => {
    return cur - prev === 1 ? cur : prev;
  });
  const last = sortedRanks[4];
  return (
    final === last || // the results from the Ace's unique order
    (final === 4 && sortedRanks[0] === 2 && last === 14)
  );
}

export const pokerConfig = {
  minPlayers: 2,
  maxPlayers: 7,
  deckType: "standard",
  jokersEnabled: 0,
  suits: {
    variations: ["S", "H", "C", "D"],
    parity: () => 0,
  },
  ranks: {
    variations: [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "J",
      "Q",
      "K",
    ],
    order: getPokerOrder,
  },
  rankedHands: true,
  rankings: [
    isRoyalFlush,
    isStraightFlush,
    isFourOfAKind,
    isFullHouse,
    isFlush,
    isStraight,
    isThreeOfAKind,
    isTwoPair,
    isPair
  ],
  betting: true,
  bidding: false,
};
