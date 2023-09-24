import ListItemTextField from "@/components/list/ListItemTextField.tsx";
import FormStore from "@/store/form.store.ts";
import { List } from "@mui/material";
import {
  empty,
  extendZodWithMobxZodForm,
  MobxZodField,
  MobxZodObjectField,
} from "@monoid-dev/mobx-zod-form";
import { getForm, useForm } from "@monoid-dev/mobx-zod-form-react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { observer } from "mobx-react";
import { useState } from "react";
import { z, type ZodString, type ZodNumber } from "zod";

// Necessary step to setup zod with mobx-zod-form power!
extendZodWithMobxZodForm(z);

export const TestForm = observer(() => {
  const [dataTest, setDataTest] = useState();

  const { setParam, data } = FormStore;

  const form = useForm(
    z.object({
      username: z.string().min(1),
      password: z.string().min(6),
    }),
    {
      initialOutput: {
        username: "Artem",
        password: empty, //to represent an "emptyish" value
      },
    },
  );
  //todo initial form state from backend

  const { fields } = form.root;

  const onSubmitHandler = (formData: any) => {
    console.log(formData.data);
  };

  return (
    <form {...form.bindForm()}>
      <List>
        <ListItemTextField field={fields.username} />
        <ListItemTextField field={fields.password} />

        <ListItem>
          <Button
            variant={"contained"}
            onClick={() => {
              form.handleSubmit(() => onSubmitHandler(form.parsed));
            }}
          >
            Submit
          </Button>
        </ListItem>
      </List>
    </form>
  );
});
