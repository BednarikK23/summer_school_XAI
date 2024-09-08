export const wineTypes = ['ALL', 'RED', 'WHITE', 'ROSE', 'SPARKLING'];

export const regions = [
  'ALL',
  'Jihomoravský kraj',
  'Středočeský kraj',
  'Moravskoslezský kraj',
  'Jihočeský kraj',
  'Plzeňský kraj',
  'Karlovarský kraj',
  'Ústecký kraj',
  'Liberecký kraj',
  'Královéhradecký kraj',
  'Pardubický kraj',
  'Vysočina',
  'Olomoucký kraj',
  'Zlínský kraj',
  'Praha',
];

export const openingHours = [
  'ALL',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

export const sorts = [ 'none', 'asc', 'desc' ];

export interface FiltersWinery {
  openingTime?: string;
  closingTime?: string;
  wineType?: string;
  location?: string;
  orderOpen?: string;
  orderClose?: string;
}

export interface FiltersWine {
  wineType?: string;
  alcoholMax?: string;
  sugarMax?: string;
  priceMax?: string;
  priceMin?: string;
  year?: string;
  sortPrice?: string;
  sortYear?: string;
}

export interface FiltersTour {
  happensAfter?: string;
  happensBefore?: string;
  location?: string;
  status?: string;
  orderDate?: string;
}
