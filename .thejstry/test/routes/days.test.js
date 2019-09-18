const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const test_helpers = require("../test-helpers");

// Test day routes

// // Auxiliary function.
// function createLoginAgent(done) {
//   request()
//     .get("/login")
//     .send(test_helpers.testProfile)
//     .end(function(error, response) {
//       if (error) {
//         throw error;
//       }
//       var loginAgent = request.agent();
//       loginAgent.saveCookies(res);
//       done(loginAgent);
//     });
// }

function promisedAuthRequest() {
  var authenticatedagent2b = request.agent(app);
  return new Promise((resolve, reject) => {
    authenticatedagent2b
      .get("/login")
      .send(test_helpers.testProfile)
      .end(function(error, response) {
        if (error) reject(error);
        resolve(authenticatedagent2b);
      });
  });
}

xdescribe("/ the root path", () => {

 test("hits a private route with superagent authentication", async () => {
    return promisedAuthRequest().then(authenticatedagent => {
      return authenticatedagent.get("/day").expect(200).then(res => {
        expect(res.text).toMatch(/Day index/);
      });
    });
  });

  test('the data is peanut butter', async () => {
    const authreq = await promisedAuthRequest();
    authreq.get("/day")
    .then(response => {
      console.log(JSON.stringify(response));
      expect(response.statusCode).toBe(200);
    });
  });
  

  // test('A private route', () => {
  //   return fetchData().then(data => {
  //     expect(data).toBe('peanut butter');
  //   });
  // });

  //test("Can get a protected path", async () => {
    // await request(app).post("/login");

    // const helpers = require('../../helpers');
    // helpers.getUser = jest.fn().mockReturnValue(`{"id":1,"name":"Mr. McTesterson","email":"test@test.com","imageUrl":"http://lvh.me:3000/images/cat-profile.png","googleId":"--a-fake-google-id--","updatedAt":"2019-09-17T02:53:46.335Z","createdAt":"2019-09-17T02:53:46.335Z"}`);

    // Using auxiliary function in test cases.
    // createLoginAgent(function(agent) {
    //   var request = request.get("/day");
    //   agent.attachCookies(request);
    //   request.expect(200, done);
    // });

    // await request(app)
    //   .get("/day")
    //   .then(response => {
    //     expect(response.statusCode).toBe(200);
    //     //expect(response.statusCode).toBe(302);
    //   });
  //});
});
