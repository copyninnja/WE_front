import React from "react";

const PageTemplate = ({ title }) => {

  const isContained = (mom, son) => {
    if (!(mom instanceof Array) || !(son instanceof Array)) return false;
    if (mom.length < son.length) return false;
    var aStr = mom.toString();
    for (var i = 0, len = son.length; i < len; i++) {
      if (aStr.indexOf(son[i]) === -1) return false;
    }
    return true;
  }


  return (
<p></p>
  );
};

export default PageTemplate ;