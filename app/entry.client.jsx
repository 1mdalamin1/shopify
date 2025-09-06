import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import $ from "jquery";
import Alpine from "alpinejs";

window.$ = window.jQuery = $;
window.Alpine = Alpine;
Alpine.start();

startTransition(() => {
  hydrateRoot(document, <StrictMode><RemixBrowser /></StrictMode>);
});
// Note: If you want to use other libraries like jQuery or Alpine.js, you can initialize them here
// Example:

