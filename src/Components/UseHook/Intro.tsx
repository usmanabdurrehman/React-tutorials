import { use } from "react";

const getCards = fetch("http://localhost:7000/cards").then((res) => res.json());
const getCard = (id: number) =>
  fetch(`http://localhost:7000/cards/${id}`).then((res) => res.json());

const cardIds = [1, 2, 3];

export const Card = ({ shouldFetch }: { shouldFetch?: boolean }) => {
  if (shouldFetch) use(getCards);

  cardIds.forEach((cardId) => {
    use(getCard(cardId));
  });
};
