const { isBirthValid } = require('../src/utils/dataValidation');

describe('Birthdate Validation', function() {
    it('Birthdate validation function is wrong', function() {
        const testBirth = '2002-03-02';
        const expectedResult = true;
        const validation = isBirthValid(testBirth);
        expect(validation).toBe(expectedResult);
    });
})