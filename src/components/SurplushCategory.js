import React, { useEffect, useState } from "react";

const SurplushCategory = (props) => {

    const [categories, setCategories] = useState(null);
    //console.log(categories);
    useEffect(() => {
        setCategories(props.budget.categories);
    });

    let incomeTotal = 0;
    let expenseTotal = 0;
    let grandTotal = 0;
    if (categories && categories.length > 0) {
        categories.map((category, index) => {
            if (category.category_type === 'income') {
                let mothlyTotal = 0;
                category.items.map(item => {
                    mothlyTotal = mothlyTotal + ((item.is_active)? Number(item.monthly):0)
                })
                incomeTotal = incomeTotal + mothlyTotal;
            } else {
                let mothlyTotal = 0;
                category.items.map(item => {
                    mothlyTotal = mothlyTotal + ((item.is_active)? Number(item.monthly):0)
                })
                expenseTotal = expenseTotal + mothlyTotal;
            }            
        })
        grandTotal = incomeTotal-expenseTotal;
    }
    return (
        <>
            <table className="table table-bordered table-centered table-theme-dark">
                <tbody>
                    <tr>
                        <th className="text-left">Surplus / Deficit</th>
                        <td width="90" className={(grandTotal>0)?`text-primary`:`text-danger`}>$ {grandTotal/4}</td>
                        <td width="100" className={(grandTotal>0)?`text-primary`:`text-danger`}>$ {grandTotal/2}</td>
                        <td width="100" className={(grandTotal>0)?`text-primary`:`text-danger`}>$ {grandTotal}</td>
                        <td width="100" className={(grandTotal>0)?`text-primary`:`text-danger`} style={{ backgroundColor: "yellow" }}>$ {grandTotal*12}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default SurplushCategory;