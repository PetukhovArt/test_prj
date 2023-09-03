import { AxiosResponse } from "axios";
import { runInAction } from "mobx";
import ProfileStore from "@/store/profile.store.ts";
import TeamStore from "@/store/team.store.ts";

export async function fetchData<T>(
  store: typeof ProfileStore | typeof TeamStore,
  fetchFunction: () => Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    store.state = "pending";
    const res = await fetchFunction();
    runInAction(() => {
      store.state = "done";
    });
    return res.data;
  } catch (e) {
    runInAction(() => {
      store.state = "error";
    });
    throw e;
  }
}
