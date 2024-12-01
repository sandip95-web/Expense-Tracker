import Card from "./common/Card";

type CardType = "saving" | "expense" | "investment";
const cardTypes: CardType[] = [
  "saving",
  "expense",
  "investment",
  "saving",
  "expense",
];
const Cards = () => {
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-start mb-20">
        {cardTypes.map((cardType, index) => (
          <Card key={index} cardType={cardType} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
