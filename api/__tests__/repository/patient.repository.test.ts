import { prismaMock } from '../../__mocks__/prisma/singleton'
import { mockWinston } from '../../__mocks__/logger/singleton';

mockWinston();

test('should get all patients ', async () => {
  const patient = [
    {
      id: 1,
      firstname: 'weimin', 
      lastname: 'chai', 
      email: 'hello@gmail.com',
      createdat: new Date('2022-03-13'),
      updatedat: new Date('2022-03-13')
    }
  ]

  prismaMock.patients.findMany.mockResolvedValue(patient);
  
  const PatientRepository = require('../../repository/patient.repository').default;
  await expect(PatientRepository.getPatients()).resolves.toEqual([{
    id: 1,
    firstname: 'weimin', 
    lastname: 'chai', 
    email: 'hello@gmail.com',
    createdat: new Date('2022-03-13'),
    updatedat: new Date('2022-03-13')
  }])
})

test('should create new patient ', async () => {
  const dt = new Date();
  const patient =
    {
      id: 2,
      firstname: 'weimin', 
      lastname: 'chai', 
      email: 'hello1@gmail.com',
      createdat: dt,
      updatedat: dt
    }

  prismaMock.patients.create.mockResolvedValue(patient)

  const PatientRepository = require('../../repository/patient.repository').default;
  await expect(PatientRepository.createPatient(patient)).resolves.toEqual({
      id: 2,
      firstname: 'weimin', 
      lastname: 'chai', 
      email: 'hello1@gmail.com',
      createdat: dt,
      updatedat: dt
  })
})