import s from "./error-page.module.scss";
import error404 from "./404.svg";
import Typography from "@mui/material/Typography";

export const ErrorPage = () => {
  return (
    <div className={s.errorPage}>
      <img src={error404} alt={"404"} className={s.error404} />
      <Typography> Oops! The page does not exists</Typography>
    </div>
  );
};
