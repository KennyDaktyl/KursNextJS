export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("pl-PL", {
		style: "currency",
		currency: "PLN",
	}).format(amount);
};


export const formatRating = (rating: number): string => {
    return rating.toFixed(2);
};
