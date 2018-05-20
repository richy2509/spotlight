import "tslib";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Layout from "./layout/index";
import "./core.less";
import axios from "axios"

/**
 * Initialize the widget
 */
export function init() {
    // Exit when the widget is already initialized
    if (document.querySelector("#spotlight_wrapper")) {
        console.info("Spotlight Info: container is already initialized!");
        return;
    }

    console.info("[Spotlight] --> Initialize widget spotlight");

    createContainer();

    // Check the container
    const spotlightWrapper = document.querySelector("#spotlight_wrapper");
    if (!spotlightWrapper) {
        console.info("[Spotlight] --> Container do not exist!");
        return;
    }

    // FIXME remove jQuery event
    $("body").on("click.spotlight", "#spotlightOpener", { spotlightWrapper }, handleOpenSpotlight);
}

/**
 * Create the container of widget
 */
function createContainer() {
    const wrapper = document.createElement("div");
    wrapper.id = "spotlight_wrapper";
    wrapper.className = "spotlight_wrap";

    const spotlightContainer = document.getElementsByClassName("spotlight-container")[0];
    spotlightContainer.appendChild(wrapper);
}

/**
 * The handleOpenSpotlight is the action that fetch hotel's Ids in the
 * the session storage and open the spotlight with the needed data.
 * @param {JQuery.Event} evt
 */
function handleOpenSpotlight(evt) {

    console.info("[Spotlight] --> Handle opening spotlight !");

    // FIXME add prefix scriptSpotlight into id
    let url = document.querySelector<HTMLScriptElement>("#spotlight").dataset.url;

    if (!url) {
        console.error("[Spotlight] --> Unable to find url. data-url attribute not found in script tag");
        return;
    }

    ReactDOM.render(<Layout />, evt.data.spotlightWrapper);
    document.querySelector("#spotlight_wrapper").classList.add("spotlight_open");
}

/**
 * Auto start
 * @type {() => void}
 */
export const start = init;
start();