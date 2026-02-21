
// import captainModel from "../models/user.model.js";

// export const createCaptain = async ({
//   firstname, lastname, email, password, 
//   color, plate, capacity, vehicleType
// }) =>{ 
//     if (!firstname || !email || !password || !color || 
//         !plate || !capacity || !vehicleType) {
//         throw new Error('All fields are required');
//     }
//     const captain = captainModel.create({
//         fullname : {
//           firstname, lastname
//         },
//         email,
//         password,
//         vehicle : {
//           color, 
//           plate, 
//           capacity, 
//           vehicleType
//         }
//     })


//     return captain;
// }


import captainModel from "../models/captain.model.js";

export const createCaptain = async (data) => {
  if (!data) {
    throw new Error("Captain data is required");
  }

  const captain = await captainModel.create(data);
  return captain;
};