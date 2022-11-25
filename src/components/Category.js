import React, { useEffect, useState } from "react";
import {
  Edit,
  Check,
  Delete,
  AddCircleOutlined,
  CircleOutlined,
} from "@mui/icons-material/";

import Skeletons from "../components/utils/Skeletons";

const Category = (props) => {

  const [category, setCategory] = useState({});
  useEffect(() => {
    setCategory({ ...props.budgets[props.bindex].categories[props.cindex] });
  }, [category.items])

  let totalMonthly = 0;
  category && category.items &&
    category.items.forEach((i) => (totalMonthly = totalMonthly + ((i.is_active) ? parseInt(i.monthly) : 0)));

  return (<>
    <div className="row mb-3 ">
      <div className="col-12">
        <div className="table-content">
          {category ? <>
            <table className="table table-bordered table-centered table-theme-dark">
              <thead>
                <tr key={`table-head` + category.category_name + `-`}>
                  <th className={`text-left align-top`}>
                    {(category.edit) ?
                      <input
                        className="form-control form-control-sm"
                        value={category.category_name}
                        autoFocus={true}
                        maxLength={100}
                        placeholder={`Enter categoty name here.`}
                        onChange={(e) => {
                          setCategory(() => {
                            category.category_name = e.target.value;
                            return { ...category };
                          })
                        }} />
                      :
                      <strong>
                        {category.category_name}
                      </strong>
                    }
                  </th>
                  <th className={`align-top`} style={{ width: 90 }}>
                    Weekly
                  </th>
                  <th className={`align-top`} style={{ width: 100 }}>
                    Bi-Weekly
                  </th>
                  <th className={`align-top`} style={{ width: 100 }}>
                    Monthly
                  </th>
                  <th className={`align-top`} style={{ width: 100 }}>
                    Yearly
                  </th>
                  <th className={`align-middle`} style={{ width: 75 }}>
                  <span style={{ display: "flex", justifyContent: "space-around", }}>
                      {!category.edit ?
                        <button
                          className="btn btn-sm btn-success btn-tiny"
                          onClick={(e) => {
                            category.edit = true;
                            setCategory({ ...category });
                            props.budgets[props.bindex].categories[props.cindex].edit=false;
                            props.setBudgets({ ...props.budgets });
                          }}
                        >
                          <Edit />
                        </button>
                        : <>
                          <button
                            className="btn btn-sm btn-success btn-tiny"
                            style={{ marginLeft: 5 }}
                            onClick={(e) => {
                              category.edit = false;
                              category.is_active = true;
                              setCategory({ ...category });
                              props.saveCategories(category);
                              props.budgets[props.bindex].categories[props.cindex].edit=false;
                              props.budgets[props.bindex].categories[props.cindex].is_active=true;
                              props.setBudgets({ ...props.budgets });
                            }}
                          >
                            <Check />
                          </button>
                          <button
                            className="btn btn-sm btn-danger btn-tiny"
                            style={{ marginLeft: 5 }}
                            onClick={(e) => {
                              props.budgets[props.bindex].categories.splice(props.cindex, 1);
                              props.removeCategories(category);
                              props.setBudgets({ ...props.budgets });
                            }}
                          >
                            <Delete />
                          </button>
                        </>}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.items && category.items.length > 0 ? <>
                  {category.items.map((item, index) => (
                    <tr key={`categoty-item-` + index}>
                      <td className="text-left position-relative">
                        {(item.edit) ?
                          <input
                            className="form-control form-control-sm"
                            value={item.name}
                            autoFocus={true}
                            maxLength={100}
                            placeholder={`Enter income title here.`}
                            onChange={(e) => {
                              props.budgets[props.bindex].categories[props.cindex].items[index].name = e.target.value;
                              category.items[index].name = e.target.value;
                              setCategory({ ...category });
                              props.setBudgets({ ...props.budgets });
                            }} />
                          :
                          <strong>
                            {item.name}
                          </strong>
                        }
                      </td>
                      <td>
                        <span className="cell weekly">
                          $ {item.is_active ? item.weekly : 0}
                        </span>
                      </td>
                      <td>
                        <span className="cell biweekly">
                          $ {item.is_active ? item.biweekly : 0}
                        </span>
                      </td>
                      <td>
                        {item.edit === true ?
                          <input
                            className="form-control form-control-sm"
                            value={item.monthly}
                            placeholder={`Enter monthly income here.`}
                            maxLength={20}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                              props.budgets[props.bindex].categories[props.cindex].items[index].weekly = val / 4;
                              props.budgets[props.bindex].categories[props.cindex].items[index].biweekly = val / 2;
                              props.budgets[props.bindex].categories[props.cindex].items[index].monthly = val / 1;
                              props.budgets[props.bindex].categories[props.cindex].items[index].yearly = val * 12;
                              category.items[index].weekly = val / 4;
                              category.items[index].biweekly = val / 2;
                              category.items[index].monthly = val / 1;
                              category.items[index].yearly = val * 12;
                              setCategory({ ...category });
                              props.setBudgets({ ...props.budgets });
                            }} />
                          :
                          <span className="cell monthly">
                            $ {item.is_active ? item.monthly : 0}
                          </span>
                        }
                      </td>
                      <td style={{ backgroundColor: "#006f51", color: "white" }}>
                        <span className="cell yearly">
                          $ {item.is_active ? item.yearly : 0}
                        </span>
                      </td>
                      <td>
                        <span style={{ display: "flex", justifyContent: "space-around", }}>
                          {!item.edit ?
                            <button
                              className="btn btn-sm btn-success btn-tiny"
                              onClick={(e) => {
                                category.items[index].edit = true;
                                setCategory({ ...category });
                                props.editItem(props.bindex, props.cindex, index);
                              }}
                            >
                              <Edit />
                            </button>
                            : <>
                              <button
                                className={`btn btn-sm btn-tiny ${(category.items[index].is_active) ? `btn-outline-info` : `btn-outline-danger`}`}
                                onClick={(e) => {
                                  (props.budgets[props.bindex].categories[props.cindex].items[index].is_active) ? props.budgets[props.bindex].categories[props.cindex].items[index].is_active = false : props.budgets[props.bindex].categories[props.cindex].items[index].is_active = true;
                                  props.saveItem(props.bindex, props.cindex, index);
                                  (category.items[index].is_active) ? category.items[index].is_active = false : category.items[index].is_active = true;
                                  setCategory({ ...category });
                                  props.setBudgets({ ...props.budgets });
                                }}
                              >
                                <CircleOutlined />
                              </button>
                              <button
                                className="btn btn-sm btn-success btn-tiny"
                                style={{ marginLeft: 5 }}
                                onClick={(e) => {
                                  props.budgets[props.bindex].categories[props.cindex].items[index].edit = false;
                                  props.budgets[props.bindex].categories[props.cindex].items[index].priority = index + 1;
                                  props.setBudgets({ ...props.budgets });
                                  props.saveItem(props.bindex, props.cindex, index);
                                  category.items[index].edit = false;
                                  setCategory({ ...category });
                                }}
                              >
                                <Check />
                              </button>
                              <button
                                className="btn btn-sm btn-danger btn-tiny"
                                style={{ marginLeft: 5 }}
                                onClick={(e) => {
                                  let id = category.items[index].id;
                                  props.budgets[props.bindex].categories[props.cindex].items.splice(index, 1);
                                  props.setBudgets({ ...props.budgets });
                                  props.removeItem(id);
                                  category.items.splice(index, 1);
                                  setCategory({ ...category });
                                  console.log();
                                }}
                              >
                                <Delete />
                              </button>
                            </>}
                        </span>
                      </td>
                    </tr>
                  ))}
                </> : <></>}
                <tr key={`category-` + props.budgets[props.bindex].categories[props.cindex].category_name + `-total`}>
                  <td className="text-left">
                    <strong>Total</strong>
                  </td>
                  <>
                    <td>
                      <strong>$ {totalMonthly / 4}</strong>
                    </td>
                    <td>
                      <strong>$ {totalMonthly / 2}</strong>
                    </td>
                    <td>
                      <strong>$ {totalMonthly}</strong>
                    </td>
                    <td>
                      <strong>$ {totalMonthly * 12}</strong>
                    </td>
                    <td style={{ backgroundColor: "yellow" }}></td>
                  </>
                </tr>
              </tbody>
            </table>
            <div className="text-right">
              <button className="btn btn-sm btn-success btn-success-dark"
                onClick={() => {
                  props.addItem(props.bindex, props.cindex);
                }}
              >
                <AddCircleOutlined />
                Row
              </button>
            </div>
          </> : <><Skeletons skeletons={[{ variant: "rounded", width: "100%", height: 100 },]} /></>}
        </div>
      </div>
    </div>
  </>)
}

export default Category;