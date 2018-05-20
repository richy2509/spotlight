export interface ISpotlightResult {
    searchQuery: string;
    nbItems: number
    results: ISearchResult[];
}

export interface ISearchResult {
    code: string,
    label: string,
    type: string
}
