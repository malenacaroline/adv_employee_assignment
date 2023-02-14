"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EmployeeSearch;
function EmployeeSearch() {
  return /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("form", {
    name: "searchEmployee",
    onSubmit: function onSubmit() {
      return null;
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstname",
    placeholder: "First Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "department",
    placeholder: "Department"
  }), /*#__PURE__*/React.createElement("select", {
    name: "department",
    placeholder: "Department",
    "aria-label": "label for the select"
  }, /*#__PURE__*/React.createElement("option", {
    value: "IT"
  }, "IT"), /*#__PURE__*/React.createElement("option", {
    value: "Marketing"
  }, "Marketing"), /*#__PURE__*/React.createElement("option", {
    value: "HR"
  }, "HR"), /*#__PURE__*/React.createElement("option", {
    value: "Engineering"
  }, "Engineering")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "type",
    placeholder: "Type"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Search")));
}