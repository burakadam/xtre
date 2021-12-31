import Vue from "vue";
import VueRouter from "vue-router";

import DefaultLayout from "@/views/layouts/default-layout";
import FinanceLayout from "@/views/layouts/finance-layout";
import ExpenseLayout from "@/views/layouts/expense-layout";
import TimesheetLayout from "@/views/layouts/timesheet-layout";
import AuthLayout from "@/views/layouts/auth-layout";

import Home from "@/views/home/Home";
import Finance from "@/views/finance/Finance";
import Forecast from "@/views/finance/Forecast";
import InvoiceManagement from "@/views/finance/InvoiceManagement";
import Accounting from "@/views/accounting/Accounting";
import Notifications from "@/views/notifications/Notifications";
import ResourceManagement from "@/views/finance/ResourceManagement";
import Expense from "@/views/expense/Expense";
import ExpenseList from "@/views/expense/ExpenseList";
import Timesheet from "@/views/timesheet/Timesheet";
import TimesheetDetail from "@/views/timesheet/TimesheetDetail";
import Login from "@/views/auth/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/finance",
    component: FinanceLayout,
    children: [
      {
        path: "/finance",
        name: "Finance",
        component: Finance,
      },
      {
        path: "/finance/forecast",
        name: "Forecast",
        component: Forecast,
      },
      {
        path: "/finance/invoiceMamanagement",
        name: "InvoiceManagement",
        component: InvoiceManagement,
      },
      {
        path: "/finance/resourceManagement",
        name: "ResourceManagement",
        component: ResourceManagement,
      },
    ],
  },
  {
    path: "/accounting",
    component: FinanceLayout,
    children: [
      {
        path: "/accounting",
        name: "Accounting",
        component: Accounting,
      },
    ],
  },
  {
    path: "/notifications",
    component: FinanceLayout,
    children: [
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
      },
    ],
  },
  {
    path: "/expense",
    component: ExpenseLayout,
    children: [
      {
        path: "/expense",
        name: "Expense",
        component: Expense,
      },
      {
        path: "/expense/expense-list",
        name: "ExpenseList",
        component: ExpenseList,
      },
    ],
  },
  {
    path: "/timesheet",
    component: TimesheetLayout,
    children: [
      {
        path: "/timesheet",
        name: "Timesheet",
        component: Timesheet,
      },
      {
        path: "/timesheet/detail",
        name: "TimesheetDetail",
        component: TimesheetDetail,
      },
    ],
  },
  {
    path: "/auth/login",
    component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: Login,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
