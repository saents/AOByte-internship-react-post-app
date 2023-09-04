import Cookies from "js-cookie";

export const getPostIdWithAverageRating = (posts) => {
    let maxAverageRating = 0;
    let postIdWithMaxRating = null;

    posts.forEach((post) => {
        const {comments} = post;
        const totalRatings = comments.reduce((sum, comment) => sum + comment.rate, 0);
        const averageRating = totalRatings / comments.length;

        if (averageRating > maxAverageRating) {
            maxAverageRating = averageRating;
            postIdWithMaxRating = post._id;
        }
    });

    return {
        maxAverageRating,
        postIdWithMaxRating,
    };
};

export const filterUsedPosts = (posts, usedPostsIds) => {
    if (posts.length === usedPostsIds.length) {
        return null;
    }
    const filteredPosts = posts.filter((item) => !usedPostsIds.includes(item._id));
    return filteredPosts;
};

export const filterPostsByKey = (posts, searchQuery, selectedKey) => {
    if (!posts.length) {
        return;
    }

    return posts.filter((post) => {
        const postValue = post[selectedKey];

        if (typeof postValue === "string") {
            return postValue.toLowerCase().includes(searchQuery.toLowerCase());
        }

        if (Array.isArray(postValue)) {
            return postValue.some((item) => Object.values(item).join(" ").toLowerCase().includes(searchQuery.toLowerCase()));
        }

        return false;
    });
};

export const composeInitials = (str) => str[0].toUpperCase();

export const getAccessTokenFromCookies = () => {
    const token = Cookies.get("accessToken");
    if (!token) {
        return null;
    }
    return token;
};
