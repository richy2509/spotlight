import * as React from "react";
import { Component } from "react";
import { ISpotlightResult, ISearchResult } from "../model/ISpotlight";

export interface ILayoutProps {
    nbItems: number;
    results: ISearchResult[];
}

/**
 * @class Layout
 */
export default class Layout extends Component<ILayoutProps, any> {

    constructor(props: ILayoutProps) {
        super(props);
        this.state = {
            nbItems: this.props.nbItems,
            results: this.props.results
        };
    }

    componentDidUpdate(oldProps) {
        // By duplicating the data, you have to then
        // keep the local copy in sync with the
        // updated props...
        if (oldProps.nbItems !== this.props.nbItems) {
            // This triggers an unnecessary re-render
            this.setState({
                nbItems: this.props.nbItems,
                result: this.props.results
            });
        }
    }

    public render() {
        return (
            <div className="container">
                <span className="result-nb">{this.props.nbItems}</span>
                {this.props.results.map(result => {
                    return (
                        <li data-code={result.code}>{result.label}</li>
                    )
                })}
            </div>
        );
    }

}

