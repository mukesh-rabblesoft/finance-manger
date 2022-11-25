import React, { useEffect, useState } from "react";

import Skeletons from "../components/utils/Skeletons";

const ExpenseCategory = (props) => {

    const [categories, setCategories] = useState(null);
    //console.log(categories);
    useEffect(() => {
        setCategories(props.budget.categories);
    });

    let grandTotal = 0;
    if (categories && categories.length > 0) {
        categories.map((category, index) => {
            if (category.category_type !== 'income') {
                let mothlyTotal = 0;
                category.items.map(item => {
                    mothlyTotal = mothlyTotal + ((item.is_active) ? Number(item.monthly) : 0)
                })
                categories[index].weekly = mothlyTotal / 4;
                categories[index].biweekly = mothlyTotal / 2;
                categories[index].monthly = mothlyTotal;
                categories[index].yearly = mothlyTotal * 12;
                grandTotal = grandTotal + categories[index].monthly;
            }
        })
    }
    return (<>
        <div className="row mb-3 ">
            <div className="col-12">
                <div className="table-content">
                    {categories ? <>
                        <table key={`table-expanse-main`} className="table table-bordered table-centered table-theme-dark">
                            <thead>
                                <tr key={`table-head-expanse-main`}>
                                    <th className={`text-left align-top bg-orange`}>
                                        Summary
                                    </th>
                                    <th className={`align-top bg-orange`} style={{ width: 90 }}>
                                        Weekly
                                    </th>
                                    <th className={`align-top bg-orange`} style={{ width: 100 }}>
                                        Bi-Weekly
                                    </th>
                                    <th className={`align-top bg-orange`} style={{ width: 100 }}>
                                        Monthly
                                    </th>
                                    <th className={`align-top bg-orange`} style={{ width: 100 }}>
                                        Yearly
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(categories && categories.length > 0) ? <>
                                    {categories.map((item, index) => (
                                        ((item.category_type === 'income') ? <></> :
                                            <tr id={`categoty-expense-item-${index}`} key={`categoty-expense-item-${index}`}>
                                                <td key={`categoty-expense-item-name-${index}`} className="text-left position-relative">
                                                    <strong>
                                                        {item.category_name} - {((item.monthly / grandTotal) * 100).toFixed(2)}%
                                                    </strong>
                                                </td>
                                                <td key={`categoty-expense-item-weekly-${index}`}>
                                                    <span className="cell weekly">
                                                        $ {item.is_active ? item.weekly : 0}
                                                    </span>
                                                </td>
                                                <td key={`categoty-expense-item-biweekly-${index}`}>
                                                    <span className="cell biweekly">
                                                        $ {item.is_active ? item.biweekly : 0}
                                                    </span>
                                                </td>
                                                <td key={`categoty-expense-item-monthly-${index}`}>
                                                    <span className="cell monthly">
                                                        $ {item.is_active ? item.monthly : 0}
                                                    </span>
                                                </td>
                                                <td key={`categoty-expense-item-yearly-${index}`} style={{ backgroundColor: "#006f51", color: "white" }}>
                                                    <span className="cell yearly">
                                                        $ {item.is_active ? item.yearly : 0}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </> : <></>}
                                <tr key={`category-expense-grandtotal-${grandTotal}`}>
                                    <td className="text-left">
                                        <strong>Total</strong>
                                    </td>
                                    <td>
                                        <strong>$ {grandTotal / 4}</strong>
                                    </td>
                                    <td>
                                        <strong>$ {grandTotal / 2}</strong>
                                    </td>
                                    <td>
                                        <strong>$ {grandTotal}</strong>
                                    </td>
                                    <td style={{ backgroundColor: "yellow" }}>
                                        <strong>$ {grandTotal * 12}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </> : <><Skeletons skeletons={[{ variant: "rounded", width: "100%", height: 100 },]} /></>}
                </div>
            </div>
        </div>
    </>)
}

export default ExpenseCategory;