const { isEmailValid } = require('../src/utils/dataValidation');

describe('Email Validation', function() {
    it('Email validation function is wrong', function() {
        const testEmail = 'teste@teste.com';
        const expectedResult = true;
        const validation = isEmailValid(testEmail);
        expect(validation).toBe(expectedResult);
    });
})