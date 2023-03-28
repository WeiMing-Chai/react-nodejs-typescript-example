import { json } from "sequelize";
import * as request from "supertest";

import app from "../../app";
import patientRepository from '../../repository/patient.repository';

/* unit test */

describe("Patient routes", () => {
  test("Get all patients", async () => {
    // mock patientRepository.getPatients into a dummy function that does nothing
    const getPatientsSpy = jest.spyOn(patientRepository, 'getPatients').mockImplementation();

    const res = await request(app).get("/api/patients");
  
    expect(getPatientsSpy).toHaveBeenCalledTimes(1);
  });

  test("Create patient", async () => {
    // mock patientRepository.createPatient into a dummy function that does nothing
    const createPatientSpy = jest.spyOn(patientRepository, 'createPatient').mockImplementation();

    const payload = {
      id: 1,
      firstname: 'weimin', 
      lastname: 'chai', 
      email: 'hello@gmail.com',
      createdat: new Date('2022-03-13'),
      updatedat: new Date('2022-03-13')
    };
    const res = await request(app).post("/api/patient")
    .send(payload)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  
    expect(createPatientSpy).toHaveBeenCalledTimes(1);
  });
});

/* integration test */

// expect(res.body[0].firstname).toEqual("weiming");
//   expect(res.body[0].lastname).toEqual("chai");
//   expect(res.body[0].email).toEqual("hello@gmail.com");

// describe("Patient routes", () => {
//   test("Create new patient", async () => {
//     const payload = {firstname: 'john', lastname: 'wick', email: 'xyz@sadfjak.com' };
//     const res = await request(app).post("/api/patient")
//                                   .send(payload)
//                                   .set('Content-Type', 'application/json')
//                                   .set('Accept', 'application/json')
//   });
// });