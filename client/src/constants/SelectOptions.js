export const SearchSelectOptions = [
    {
        value: "title",
        label: "Title",
    },
    {
        value: "body",
        label: "Body",
    },
    {
        value: "comments",
        label: "Comments",
    },
];

export const PostsCreateSelectOptions = [
    {
        value: 'general',
        label: 'General'
    },
    {
        value: 'space',
        label: 'Space'
    },
    {
        value: 'books',
        label: 'Books'
    },
    {
        value: 'information',
        label: 'Information'
    },
]

export const PaginationSelectOptions = [
    {
        value: 5,
        label: "5",
    },
    {
        value: 10,
        label: "10",
    },
    {
        value: 15,
        label: "15",
    },
];

export const postsSortingSearchOptions = [
    {
        value: "creationDate",
        label: "Creation Date",
    },
    {
        value: "rating",
        label: "Rating",
    },
];

export const postsFilteringSearchOptions = [
    {
        value: "categories",
        label: "Categories",
        children: PostsCreateSelectOptions
    },
    {
        value: "author",
        label: "Author",
        children: []
    },
];