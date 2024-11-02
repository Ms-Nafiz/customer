import customerArray from "../data/customers";

export const PreparedData = () => {
  let cleanedData = customerArray.map((subArray) => {
    return subArray.map((item) => {
      return item.trim().replace(/\s+/g, " ");
    });
  });

  let newData = [];
  newData.push(cleanedData);

  let updatedData = cleanedData.map((subArray) => {
    subArray[3] = subArray[3]
      .replace("House No # ", "")
      .replace("Flat No # ", "")
      .trim(); // Remove "Digital" and trim any extra spaces
    return subArray;
  });
  const splitAddresses = updatedData.map((subArray) => {
    let addressParts = subArray[3].split(",").map((part) => part.trim()); // Split by comma and trim each part
    return [...subArray.slice(0, 3), addressParts, ...subArray.slice(4)]; // Replace the old address with the split parts
  });

  return splitAddresses;
};
