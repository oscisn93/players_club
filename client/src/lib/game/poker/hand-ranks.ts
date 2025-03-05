import { BaseCard } from "../types";

export function getOrderFromRank(rank: string) {
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
  if (ranks.indexOf(cards[0]!!.rank) === -1) {
    return 10;
  }
  return isFlush(cards) ? 1 : 10;
}

function isStraightFlush(cards: BaseCard[]) {
  return isFlush(cards) && isStraight(cards) ? 2 : 10;
}

function isFlush(cards: BaseCard[]) {
  const suit = cards[0]!.suit;
  return cards.reduce((count, cur) => {
    return cur.suit === suit ? count + 1 : count;
  }, 0) === 5
    ? 5
    : 10;
}

export function getRankCounts(cards: BaseCard[]) {
  const counts: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    const rank = cards[i]!.rank;
    if (!counts[rank]) {
      counts[rank] = 1;
    } else counts[rank]++;
  }
  return Object.values(counts);
}

function isFourOfAKind(cards: BaseCard[]) {
  return getRankCounts(cards).indexOf(4) !== -1 ? 3 : 10;
}

function isFullHouse(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.length === 2 && (counts[0] === 2 || counts[0] === 3) ? 4 : 10;
}

function isThreeOfAKind(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.indexOf(3) !== -1 ? 7 : 10;
}

function isTwoPair(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.reduce((prev, cur) => {
    return prev + cur;
  }) === 5
    ? 8
    : 10;
}

function isPair(cards: BaseCard[]) {
  const counts = getRankCounts(cards);
  return counts.reduce((prev, cur) => {
    return prev + cur;
  }) === 6
    ? 9
    : 10;
}

function isStraight(cards: BaseCard[]) {
  const sortedRanks = cards
    .map((card) => getOrderFromRank(card.rank))
    .sort((a, b) => a - b);
  const final = sortedRanks.reduce((prev, cur) => {
    return cur - prev === 1 ? cur : prev;
  });
  const last = sortedRanks[4];
  return final === last || // the results from the Ace's unique order
    (final === 4 && sortedRanks[0] === 2 && last === 14)
    ? 6
    : 10;
}

export function handRanks(cards: BaseCard[]) {
  return Math.min(
    isRoyalFlush(cards),
    isStraightFlush(cards),
    isFourOfAKind(cards),
    isFullHouse(cards),
    isFlush(cards),
    isStraight(cards),
    isThreeOfAKind(cards),
    isTwoPair(cards),
    isPair(cards),
  );
}
