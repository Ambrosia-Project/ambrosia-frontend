const menuListItems = [
  {
    id: 1,
    name: "Personalized",
  },
  {
    id: 2,
    name: "Normal",
  },
  {
    id: 3,
    name: "Vegan",
  },
  {
    id: 4,
    name: "Vegetarian",
  },
  {
    id: 5,
    name: "Gluten-Free",
  },
  {
    id: 6,
    name: "Lactose-Free",
  },
];

const mealTypes = [
  { value: "main-dishes", name: "Main Dishes" },
  { value: "dessert", name: "Dessert" },
];
const allergyTypes = [
  { value: "gluten", name: "Gluten" },
  { value: "lactose", name: "Lactose" },
];
const priceRange = [
  { value: "0-100", name: "$0 - $100" },
  { value: "100-150", name: "$100 - $150" },
  { value: "150-200", name: "$150 - $200" },
  { value: "200-250", name: "$200 - $250" },
  { value: "250-999999", name: "$250+" },
];

const constants = {
  menuListItems,
  mealTypes,
  allergyTypes,
  priceRange,
};

export default constants;
