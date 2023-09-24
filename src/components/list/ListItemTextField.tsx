import { MobxZodField } from "@monoid-dev/mobx-zod-form";
import { getForm } from "@monoid-dev/mobx-zod-form-react";
import { TextField, TextFieldProps } from "@mui/material";
import { observer } from "mobx-react";
import { ZodNumber, ZodString } from "zod";
import ListItemCustom from "./ListItemCustom";
import { ReactNode } from "react";

type ListItemTextFiled = {
  prepend?: ReactNode;
  append?: ReactNode;
  width?: string;
  base?: TextFieldProps;
  customTitle?: string;
  field?: MobxZodField<ZodString | ZodNumber>;
};

const ListItemTextField = observer(
  ({ base, customTitle, prepend, append, field }: ListItemTextFiled) => {
    return (
      <ListItemCustom title={customTitle ? customTitle : field?.path}>
        {prepend}
        <TextField
          {...base}
          placeholder={field?.path.at(-1)?.toString()}
          autoComplete="off"
          size="small"
          variant="outlined"
          inputProps={field && { ...getForm(field).bindField(field) }}
        />
        {field?.touched &&
          field?.errorMessages.map((e, i) => (
            <div style={{ color: "red" }} key={i}>
              {e}
            </div>
          ))}
        {append}
      </ListItemCustom>
    );
  },
);

export default ListItemTextField;
