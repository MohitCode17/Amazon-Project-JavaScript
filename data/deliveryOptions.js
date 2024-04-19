export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: "7",
    deliveryPriceCents: 0,
  },
  {
    id: "2",
    deliveryDays: "3",
    deliveryPriceCents: 499,
  },
  {
    id: "3",
    deliveryDays: "1",
    deliveryPriceCents: 999,
  },
];
