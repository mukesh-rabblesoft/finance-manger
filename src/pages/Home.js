import React, { useState, useEffect } from "react";

import {
  AddCircleOutlined,
} from "@mui/icons-material/";

import {
  saveCategory,
  removeCategory,
  saveCategoryItem,
  removeCategoryItem
} from "../redux/apis";

import { connect } from "react-redux";
import Category from "../components/Category";
import Donut3dChart from "../components/Donut3dChart";
import { getBudget } from "../redux/actions/budgetAction";
import IncomeCategory from "../components/IncomeCategory";
import ExpenseCategory from "../components/ExpenseCategory";
//import SnackbarTost from "../components/utils/SnackbarTost";
import Loader from "../components/utils/Loader";
import Skeletons from "../components/utils/Skeletons";
import { categotyFormat, itemFormat } from "../components/utils/Formats";
import SurplushCategory from "../components/SurplushCategory";

const Home = (props) => {

  console.log("home page",props)

  const [loading, setLoadering] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const refreshBudget = async () => {
    setLoadering(true);
    await props.getBudget(props)
      .then((resp) => {
        setBudgets(props.budget.budget)
      })
      .catch((e) => {
        if (!e.response) {
          console.log('Sorry! Backend service is down.');
        } else {
          console.log(e);
        }
      });
    setLoadering(false);
  }

  const addBudget = () => {

  }

  const saveBudget = () => {

  }

  const removeBudget = () => {

  }

  const addCategory = (index) => {
    let category = categotyFormat;
    let catIndex = budgets[index].categories.length + 1;
    category.priority = catIndex;
    category.budget_id = budgets[index].id;
    category.edit = true;
    budgets[index].categories.push(category);
    setBudgets({ ...budgets });
  }

  const saveCategories = async (item) => {
    setLoadering(true);
    await saveCategory(props, item,)
      .then(res => {
        refreshBudget();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(e => {
        console.log(e);
      });
  }

  const removeCategories = async (item) => {
    if (item.id) {
      setLoadering(true);
      await removeCategory(props, { id: item.id })
        .then(res => {
          refreshBudget();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }).catch(e => {
          console.log(e);
        });
    }

  }

  const addItem = (bindex, cindex) => {
    let item = itemFormat;

    item.category_id = budgets[bindex].categories[cindex].id;

    console.log(item);
    budgets[bindex].categories[cindex].items.push(item);
    setBudgets({ ...budgets });
  }

  const editItem = (bindex, cindex, index) => {
    budgets[bindex].categories[cindex].items[index].edit = true;
    setBudgets({ ...budgets });
  }
  const saveItem = async (bindex, cindex, index) => {
    setLoadering(true);
    await saveCategoryItem(props, budgets[bindex].categories[cindex].items[index],)
      .then(res => {
        refreshBudget();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(e => {
        console.log(e);
      });
  }

  const removeItem = async (id) => {
    console.log(id);
    setLoadering(true);
    await removeCategoryItem(props, { 'id': id })
      .then(res => {
        refreshBudget();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    refreshBudget();

  }, []);

  









  // useEffect(() => {
  //   if (props.auth && props.auth.isAuthenticated===false) {
  //       window.location.href='/login';
  //   }
  // }, [props.auth]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }} className="printable">
        <div className="card card-theme-dark shadow budget-container mr-2 printable">
          {budgets && Object.keys(budgets).length !== 0 ? <>
            {Object.keys(budgets).map((index) => (
              <div key={`budget-` + budgets[index].name + `-` + index} className="card-body pl-3 pr-3 pt-2">
                <section key={`budget-chartWarpper-` + index}>
                  <div className="chart-container text-center">
                    <Donut3dChart budgets={budgets} bindex={index} />
                  </div>
                </section>
                <hr style={{ borderTop: "30px solid yellow", margin: "12px -16px 0px -16px" }} />
                {Object.keys(budgets[index].categories).map((cindex) => (
                  <section key={`section-income` + budgets[index].categories[cindex].category_name + '-' + budgets[index].categories[cindex].id} className="mt-2">
                    {budgets[index].categories[cindex].category_type === 'income' ?
                      <IncomeCategory
                        key={`budget-income-category-` + budgets[index].categories[cindex].category_name}
                        budgets={budgets}
                        bindex={index}
                        cindex={cindex}
                        addItem={addItem}
                        editItem={editItem}
                        saveItem={saveItem}
                        removeItem={removeItem}
                        setBudgets={setBudgets}
                      />
                      : <></>
                    }
                  </section>
                ))}

                <section key={`section-fixed-expense-top-${budgets[index].name}`} className="mt-2">
                  <ExpenseCategory key={`budget-fixed-expense-category-main-${budgets[index].name}`} budget={budgets[index]} />
                </section>

                <section key={`section-SurplushCategory-${budgets[index].name}`} className="mt-2" >
                  <SurplushCategory budget={budgets[index]} />
                </section>
                <hr />
                <table key={`table-expanse-cat-main`} className="table table-bordered table-centered table-theme-dark">
                  <tbody>
                  <tr key={`table-head-expanse-main`}>
                      <th className={`text-left align-top bg-orange`}>
                        Expenses
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
                      <th className={`align-top bg-orange`} style={{ width: 75 }}></th>
                    </tr>
                  </tbody>
                </table>
                <section key={`section-new-category-${budgets[index].name}`} className="mt-2">
                  <div className="text-right">
                    <button className="btn btn-sm btn-success btn-success-dark"
                      onClick={() => {
                        addCategory(index);
                      }}
                    >
                      <AddCircleOutlined />
                      Add Category
                    </button>
                  </div>
                </section>
                <hr />
                {Object.keys(budgets[index].categories).map((cindex) => (
                  <section key={`section-expense-` + budgets[index].categories[cindex].category_name + '-' + budgets[index].categories[cindex].id} className="mt-2">
                    {budgets[index].categories[cindex].category_type !== 'income' ?
                      <Category
                        key={`budget-expense-category-` + budgets[index].categories[cindex].category_name}
                        budgets={budgets}
                        bindex={index}
                        cindex={cindex}
                        addItem={addItem}
                        editItem={editItem}
                        saveItem={saveItem}
                        removeItem={removeItem}
                        setBudgets={setBudgets}
                        saveCategories={saveCategories}
                        removeCategories={removeCategories}
                      />
                      : <></>
                    }
                  </section>
                ))}
                {/* <section key={`section-new-category-${budgets[index].name}`} className="mt-2">
                  <div className="text-right">
                    <button className="btn btn-sm btn-success btn-success-dark"
                      onClick={() => {
                        addCategory(index);
                      }}
                    >
                      <AddCircleOutlined />
                      Add Category
                    </button>
                  </div>
                </section> */}
              </div>
            ))}
          </> : <><Skeletons skeletons={[
            { variant: "rounded", width: "100%", height: 300 },
            { variant: "rounded", width: "100%", height: 35 },
            { variant: "rounded", width: "100%", height: 100 },
            { variant: "rounded", width: "100%", height: 100 },
            { variant: "rounded", width: "100%", height: 50 },
          ]} /></>}
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  budget: state.budget,
});

export default connect(mapStateToProps, {
  getBudget,
  //addBudget,
  //saveBudget
  //removeBudget,
})(Home);

