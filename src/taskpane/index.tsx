import App from "./App";
import { createRoot } from "react-dom/client";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import * as React from "react";

/* global document */

initializeIcons();

const container: HTMLElement = document.getElementById("container");
const root = createRoot(container);
root.render(<App />);
