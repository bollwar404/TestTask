'use strict';

module.exports = function (req, res, next) {
  if (!res.result && !res.emptyResponse) {
    res.status(404).json();
    return;
  }
  res.status(res.code || 200).json(res.result);
};
