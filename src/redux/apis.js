import urls from "./urls";

export const getCategory = async (user, data) => {
    return await fetch(`${urls.base + urls.category}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.auth.token,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json());
};

export const saveCategory = async (user, data) => {
    return await fetch(`${urls.base + urls.saveCategory}`, {
        method: (data.id)?"PUT":"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.auth.token,
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json());
};

export const removeCategory = async (user, data) => {
    return await fetch(`${urls.base + urls.removeCategory}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.auth.token,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json());
};

export const saveCategoryItem = async (user, data) => {
    return await fetch(`${urls.base + urls.saveCategoryItem}`, {
        method: (data.id)?"PUT":"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.auth.token,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json());
};

export const removeCategoryItem = async (user, data) => {
    return await fetch(`${urls.base + urls.removeCategoryItem}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.auth.token,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json());
};

