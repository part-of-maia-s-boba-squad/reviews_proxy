// Make sure to "npm install faker" first.
const faker = require('faker');


const arrOfDescription = (() => {
  let arr = [];
  for (let i = 0; i < 101; i++) {
      arr.push(faker.lorem.paragraph());
  }
  return arr;
})();

const arrOfLastDined60days = (()=>{
  let arr = [];
  for (let i = 0; i < 61; i++) {
      arr.push(faker.date.recent(60).toString().slice(4,15));
  }
  return arr;
})();

const arrOfFirstNames = (()=>{
  let arr = [];
  while (arr.length < 101) {
    let name = faker.name.firstName();
    if (!name.includes("\'")) {
      arr.push(name);
    }
  }
  return arr;
})();


const arrOfLastNames = (()=>{
  let arr = [];
  while (arr.length < 101) {
    let name = faker.name.lastName();
    if (!name.includes("\'")) {
      arr.push(name);
    }
  }
  return arr;
})();

const arrOfCities = (()=>{
  let arr = [];
  for (let i = 0; i < 51; i++) {
      arr.push(faker.address.city());
  }
  return arr;
})();


const noiseLevelArr = ["Quiet", "Moderate", "Loud"];


function generateRandomRestaurantId(userContext, events, done) {
    // generate data with Faker:
    const restaurantId = `${Math.floor(Math.random()*50e6)}`;
    
    // add variables to virtual user's context:
    userContext.vars.restaurantId = restaurantId;
    
    // continue with executing the scenario:
    return done();
}

function postReview(userContext,events, done) {

  let text = `${arrOfDescription[Math.floor(Math.random()*100)]}`;
  let approve = `${Math.random() < 0.2 ? true : false}`;
  let noiseLevel = `${noiseLevelArr[Math.floor(Math.random()*3)]}`;
  let vip = `${Math.random() < 0.2 ? true : false}`;
  let lastDined = `${arrOfLastDined60days[Math.floor(Math.random() * (59))]}`;
  let firstName = `${arrOfFirstNames[Math.floor(Math.random()*100)]}`;
  let lastName = `${arrOfLastNames[Math.floor(Math.random()*100)]}`;
  let location = `${arrOfCities[Math.floor(Math.random()*50)]}`;

  userContext.vars.text = text;
  userContext.vars.approve = approve;
  userContext.vars.noiseLevel = noiseLevel;
  userContext.vars.vip = vip;
  userContext.vars.lastDined = lastDined;
  userContext.vars.firstName = firstName;
  userContext.vars.lastName = lastName;
  userContext.vars.location = location;

  return done();

}
module.exports = {
  generateRandomRestaurantId, postReview
};