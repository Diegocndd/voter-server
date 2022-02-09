
const { isPasswordValid } = require('../src/utils/dataValidation');

describe('Password Validation', function() {
    it('Password validation function is wrong', function() {
        const testPassword = '1234';
        const expectedResult = true;
        const validation = isPasswordValid(testPassword);
        expect(validation).toBe(expectedResult);
    });
})