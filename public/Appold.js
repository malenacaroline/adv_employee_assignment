"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var initialIssues = [{
  id: 1,
  status: "New",
  owner: "Ravan",
  effort: 5,
  created: new Date("2018-08-15"),
  due: undefined,
  title: "Error in console when clicking Add"
}, {
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  effort: 14,
  created: new Date("2018-08-16"),
  due: new Date("2018-08-30"),
  title: "Missing bottom border on panel"
}];
function EmployeeSearch() {
  var handleNameInput = function handleNameInput(e) {
    alert("handleNameInput");
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    name: "employeeSearch",
    onSubmit: handleNameInput
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "employeeFName",
    placeholder: "First Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "employeeLName",
    placeholder: "Last Name"
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Search"
  })));
}
function EmployeeRow(props) {
  var issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : ""), /*#__PURE__*/React.createElement("td", null, issue.title));
}
function EmployeeTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return /*#__PURE__*/React.createElement(EmployeeRow, {
      key: issue.id,
      issue: issue
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}
function EmployeeCreate(props) {
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.employeeCreate;
    var employee = {
      owner: form.owner.value,
      title: form.title.value,
      status: "New"
    };
    props.createemployee(employee);
    form.owner.value = "";
    form.title.value = "";
  };
  return /*#__PURE__*/React.createElement("form", {
    name: "employeeCreate",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("label", {
    for: "firstname"
  }, "First Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstname",
    id: "firstname",
    placeholder: "First Name"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "lastname"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "lastname",
    id: "lastname",
    placeholder: "Last Name"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "age"
  }, "Age"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "age",
    id: "age",
    placeholder: "Age"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "joingDate"
  }, "Date Of Joining"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "joingDate",
    id: "joingDate",
    placeholder: "Date Of Joining"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "title"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "title",
    id: "title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "firstname"
  }, "Department"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "department",
    id: "department",
    placeholder: "Department"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "firstname"
  }, "EmployeeType"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "employeeType",
    id: "employeeType",
    placeholder: "Employee Type"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    value: "Add Employee"
  }));
}
function EmployeeDirectory() {
  var _React$useState = React.useState(initialIssues),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    employees = _React$useState2[0],
    setEmployees = _React$useState2[1];
  var createIssue = function createIssue(issue) {
    issue.id = employees.lenght + 1;
    issue.created = new Date();
    setEmployees([].concat(_toConsumableArray(employees), [issue]));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeTable, {
    issues: employees
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(EmployeeCreate, {
    createIssue: createIssue
  }));
}
var element = /*#__PURE__*/React.createElement(EmployeeDirectory, null);
ReactDOM.render(element, document.getElementById("contents"));