const formatCurrency = (value: number | string) => {
	const numeric = typeof value === 'string' ? parseFloat(value) : value;
	if(!numeric) return;
  
	return numeric
	  .toFixed(2)
	  .replace('.', ',') 
	  .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export { formatCurrency }
