var assert = require('assert');
const {add} = require("../js/utils.js");
describe('add', function() {
        it('should return 1 when the value is not present', function() {
            assert.equal(add(),1);
        });
});