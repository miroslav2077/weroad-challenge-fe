export const formatDateWithOptions = (stringDate: string, options: Intl.DateTimeFormatOptions) => {
  return new Date(stringDate).toLocaleString('en-UK', options);
}

export const formatPrice = (price: number): string => '€ ' + new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
}).format(price/100).replace(/\xA0€/g, '');