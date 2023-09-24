import { makeAutoObservable } from "mobx";

export type FormDataType = {
  username: string;
  password: string;
};

class FormStore {
  data: FormDataType = {
    username: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setParam(key: string, value: any) {
    this.data = { ...this.data, [key]: value };
  }
}

export default new FormStore();
