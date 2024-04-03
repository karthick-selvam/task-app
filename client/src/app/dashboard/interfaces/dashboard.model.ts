export interface Filters {
  startDate?: string | null;
  endDate?: string | null;
  fromTime?: string | null;
  toTime?: string | null;
  searchKey?: string;
  [key: string]: string | null | undefined; // Index signature
}
