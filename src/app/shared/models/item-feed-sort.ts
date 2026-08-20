export interface ItemFeedSort {
    code: string;
    label: string;
}

export const ITEM_FEED_SORTS: ItemFeedSort[] = [
    {
        code: 'NEWEST',
        label: 'Newest'
    },
    {
        code: 'PRICE_ASC',
        label: 'Lowest price'
    },
    {
        code: 'PRICE_DESC',
        label: 'Highest price'
    }
];