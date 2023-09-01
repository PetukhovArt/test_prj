import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "@fontsource/roboto";
import { App } from "@/app/App.tsx";
import { spy } from "mobx";
spy((ev) => {
  if (ev.type === "action") console.log(ev);
});
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
