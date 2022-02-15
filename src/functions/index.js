export const sortAscending = (data, value) => {
  let sortData = "";
  switch (value) {
    case "id":
      sortData = [...data].sort((a, b) => (b.id < a.id ? 1 : -1));
      break;

    case "city":
      sortData = [...data].sort((a, b) =>
        b.address[`${value}`].toLowerCase() <
        a.address[`${value}`].toLowerCase()
          ? 1
          : -1
      );
      break;

    default:
      sortData = [...data].sort((a, b) =>
        b[`${value}`].toLowerCase() < a[`${value}`].toLowerCase() ? 1 : -1
      );
  }
  return sortData;
};

export const sortDescending = (data, value) => {
  let sortData = "";
  switch (value) {
    case "id":
      sortData = [...data].sort((a, b) => (b.id > a.id ? 1 : -1));
      break;

    case "city":
      sortData = [...data].sort((a, b) =>
        b.address[`${value}`].toLowerCase() >
        a.address[`${value}`].toLowerCase()
          ? 1
          : -1
      );
      break;

    default:
      sortData = [...data].sort((a, b) =>
        b[`${value}`].toLowerCase() > a[`${value}`].toLowerCase() ? 1 : -1
      );
  }
  return sortData;
};
