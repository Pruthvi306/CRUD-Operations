let mobiles = []; // In-memory storage for mobiles

// Function to get all mobiles
const getMobiles = () => {
  return new Promise((resolve, reject) => {
    resolve(mobiles);  // Return all mobiles
  });
};

// Function to add a mobile
const addMobiles = (name, price, ram, storage) => {
  return new Promise((resolve, reject) => {
    const newMobile = {
    id: mobiles.length + 1,
    name,
    price,
    ram,
    storage
  };
    mobiles.push(newMobile);  // Add mobile to the array
    resolve(newMobile);  // Optionally return the new mobile data
  });
};

// Function to delete a mobile by ID
const deleteMobile = (id) => {
  return new Promise((resolve, reject) => {
    mobiles = mobiles.filter(mobile => mobile.id !== id);  // Delete by id
    resolve();
  });
};

// Exporting the functions to be used in other files
module.exports = { getMobiles, addMobiles, deleteMobile };
