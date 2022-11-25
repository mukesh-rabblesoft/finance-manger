export const budgetFormat = [{
    biweekly: 0,
    desc: "Sachin's budget",
    id: 1,
    monthly: 0,
    name: new Date().getFullYear(),
    priority: 1,
    total_amount: 0,
    weekly: 0,
    yearly: 0,
    is_active: true,
    categories: [
        {
            id: null,
            budget_id: null,
            biweekly: 0,
            category_name: "Income",
            category_type: "income",
            monthly: 0,
            priority: 1,
            total_amount: 0,
            weekly: 0,
            yearly: 0,
            edit: false,
            is_active: true,
            items: []
        }
    ],
}]

export const categotyFormat = {
    id: null,
    budget_id: null,
    category_name: "",
    category_type: "expense",
    weekly: 0,
    biweekly: 0,
    monthly: 0,
    yearly: 0,
    priority: 0,
    edit: true,
    total_amount: 0,
    is_active: true,
    items: [],
}

export const itemFormat = {
    id: null,
    name: "",
    category_id: 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
    yearly: 0,
    priority: 0,
    edit: true,
    is_active: true,
}

export const snackbarFormat = { open: false, severity: "info", message: "", vertical: "right", horizontal: "bottom" }