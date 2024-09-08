import { FiltersWine } from "../components/search/constantsFilters.ts";

export const normalizeFilters = (filter: FiltersWine) => {
  const result: FiltersWine = {};
  if (filter.wineType !== 'ALL') {
    result.wineType = filter.wineType;
  }
  if (filter.alcoholMax != '') {
    result.alcoholMax = filter.alcoholMax;
  }
  if (filter.sugarMax != '') {
    result.sugarMax = filter.sugarMax;
  }
  if (filter.priceMax != '') {
    result.priceMax = filter.priceMax;
  }
  if (filter.priceMin != '') {
    result.priceMin = filter.priceMin;
  }
  if (filter.year != '') {
    result.year = filter.year;
  }
  result.sortPrice = filter.sortPrice;
  result.sortYear = filter.sortYear;

  return result;
};
