import { proxy } from "valtio";
export const selectDateStore = proxy<{ date: Date | undefined }>({
  date: new Date(),
});
