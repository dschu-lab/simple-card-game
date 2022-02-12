import { SortOrder } from "../contexts/AppContext";

/**
 * Sorts an array of objects by realName property
 *
 * @param order Sort order
 * @returns Sorted array
 */
export const sortByRealName =
  (order: SortOrder) =>
  <T extends { realName: string }>(a: T, b: T) => {
    if (a.realName > b.realName) {
      return order === "asc" ? 1 : -1;
    } else if (a.realName < b.realName) {
      return order === "asc" ? -1 : 1;
    } else {
      return 0;
    }
  };
