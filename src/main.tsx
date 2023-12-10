import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "@/ui/styles/global.css";

import ReactDOM from "react-dom/client";

import { App } from "@/ui/layout/app";

ReactDOM
    .createRoot(document.getElementById("root")!)
    .render(<App />);
