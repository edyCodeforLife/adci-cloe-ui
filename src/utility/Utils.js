import { DefaultRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return DefaultRoute
  if (userRole === 'client') return '/access-control'
  return '/cloe/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#f03d3d1a', // for option hover bg-color
    primary: '#f03d3d', // for selected option bg-color
    neutral10: '#f03d3d', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export const getUrlParam = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

export const determineRole = (role = []) => {
  let temp = "";
  let BreakException = {};
  const Role = ["customer", "bd", "cm", "committee"]
  try {
    Role.forEach((data, index) => {
      if (role.find((rl) => rl === data)) {
        temp = data;
        throw BreakException;
      }
    })
  } catch (e) {
    if (e !== BreakException) throw e
  }
  return temp;
}

export function openUrl(url) {
  if (url === undefined || url === "undefined") return;
  window.open(process.env.REACT_APP_API_URL + url, "_blank");
}

export const deleteObjectInArray = (data, key, value) => {
  let arr = data.filter(el => el[key] !== value);
  return arr;
}

export const filterValue = (arr, val) => {
  var isFiltered = false;
  if (arr.filter(ar => ar == val) == val) {
    isFiltered = true;
  }
  return isFiltered;
}

export const convertFormDataToJSON = (form = FormData) => {
  return Object.fromEntries(form.entries());
}

export function convertObjectKey(data, arr1, arr2) {
  let arrey = [];
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    Object.assign(temp, data[i]);
    for (let y = 0; y < arr1.length; y++) {
      temp[arr2[y]] = temp[arr1[y]];
      delete temp[arr1[y]];
    }
    arrey.push(temp);
    temp = {}
  }
  return arrey;
}

export const searchKeyObjectInArray = (arr, key, value) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      return arr[i];
    }
  }
}

export const replaceAll = (val, toReplaced, replacer) => {
  return val?.split(toReplaced).join(replacer);
}

export const filteringArrayByKey = (data = [], key, value) => {
  let temp = [];

  data.forEach((val) => {
    if (val[key] == value)
      temp.push(val)
  })

  return temp;
}

export const deleteKeys = (Data = [], keysToRemove) => {
  let datas = [...Data];
  datas.forEach((data, index) => {
    keysToRemove.forEach((val) => {
      if (data?.title == val) {
        delete datas[index]
      }
    })
  })

  return datas;
}

export const sortArrayOfObject = (data = [], key) => {
  return data.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]))
}

export const numberOnlyKey = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}

export const checkData = (data) => {
  if (data === "undefined") return "";
  else return data;
}

export const deleteAllValueInKey = (obj) => {
  for (const key in obj) {
    obj[key] = "";
  }
  return obj;
}

export const returnIndex = (arr = [], name, value) => {
  return arr.findIndex((item) => item[name] == value)
}

export const checkMatchDataInObject = (checker, toCheck = []) => {
  let x = false;
  if (!toCheck) return;
  toCheck.forEach((data, index) => {
    if (data?.includes(checker)) {
      x = true;
    }
  })
  return x;
}

export const createNewArrayOfObjectWithSpecificKeys = (arr = [], keys = []) => {
  let _temp = [];
  arr.map((val, index) => {
    keys.map((key, idx) => {
      _temp.push(val?.[key])
    })
  })
  return _temp;
}

export const returnMultipleValToArr = (arr = [], arr2 = []) => {
  let arrX = JSON.parse(JSON.stringify(arr));;
  let _temp = [];
  let x = {};
  console.log("qlbi" + JSON.stringify(arrX));
  for (var i = 0; i < arr2?.length; i++) {
    console.log("qbi" + JSON.stringify(arr2?.[i]));
    x = filteringArrayByKey(arrX, "value", replaceAll(arr2?.[i], " ", ""))?.[0];
    console.log("qbi2"+JSON.stringify(x));
    _temp.push(x)
  }

  return _temp;
}