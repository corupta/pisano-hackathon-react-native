if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.debug = (...params) => {
    console.log('console-debug:', ...params);
    return params[params.length - 1];
  };
} else {
  console.debug = (...params) => params[params.length - 1];
}
console.disableYellowBox = true;
