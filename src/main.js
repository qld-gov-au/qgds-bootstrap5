import mustache from "mustache";
import Component from "./js/QGDSComponent.js";

const Alert = new Component("Alert", {
  classes: "alert-success",
  heading: "Hello, world!",
  content: "This is a simple alert component.",
  dismiss: true,
});

const Breadcrumbs = new Component("Breadcrumbs", {
  breadcrumbs: [
    { linktext: "Home", linkclass: "active", href: "#" },
    { linktext: "Library", href: "#" },
    { linktext: "Data", href: "#" },
  ],
});

document.querySelector("#app").innerHTML = Alert.html;

console.log(Breadcrumbs);
console.log("Again and again and again");

const breadcrumbsElement = document.querySelector(
  "[data-component=breadcrumbs]",
);
breadcrumbsElement.innerHTML = mustache.render(Breadcrumbs.html, Breadcrumbs);
