import * as React from "react";
import { Component } from "react";
import enumerate = Reflect.enumerate;
import { ISpotlightResult } from "../model/ISpotlight";
import axios, { AxiosResponse } from "axios";
const serialize = require("form-serialize");
import Result from "../result/index";
//var serialize = require("form-serialize");

export interface ILayoutProps {

}

/**
 * @class Layout
 */
export default class Layout extends Component<ILayoutProps, any> {

    constructor(props: ILayoutProps) {
        super(props);
        this.state = { nbItems: 0, results: [] };
        this.handleClosePanel = this.handleClosePanel.bind(this);
        this.updateResult = this.updateResult.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
    
    }

    private updateResult(search) {
        this.setState({ nbItems: search.nbItems, results: search.results });
    }

    public render() {
        return (
            <>
                <div className="spotlight_inner-wrap spotlight_position-top" onClick={this.handleClosePanel}>
                    <section id="spotlight" className="spotlight_wrapper">
                        <h1>Spotlight</h1>
                        <form action="/search" method="POST" onSubmit={this.handleSearch}>
                            <input type="text" name="query" id="searchSpotlight" value="fin" />
                            <button type="submit">Chercher</button>
                        </form>
                        <Result nbItems={this.state.nbItems} results={this.state.results} />
                    </section>
                </div>
            </>
        );
    }

    private handleSearch(evt) {
        evt.preventDefault();
        const query = serialize(evt.target);
        console.log("[Spotlight] --> Search", query);
        axios.post("search", { query })
            .then((response: AxiosResponse<ISpotlightResult>) => {
                const search: ISpotlightResult = response.data;
                console.log("Layout upgrade components");
                this.updateResult(search);
            })
            .catch((error) => {
                console.warn("[Spotlight] --> Query loaded has fail!", error);
            });
    }

    /**
     * FIXME: jQuery // React.SyntheticEvent<MouseEvent>
     * @param evt
     */
    private handleClosePanel(evt) {
        // not close when target has not #spotlight or parents
        if ($(evt.target).hasClass("spotlight_container") || $(evt.target).parents("#spotlight").length) {
            return;
        }

        document.querySelector("#spotlight_wrapper").classList.remove("spotlight_open");
    }

    /**
     * isNewSearch
     * @param {query} string
     * @returns {boolean}
     */
    private isNewSearch(query: string): boolean {
        return true;
    }
}