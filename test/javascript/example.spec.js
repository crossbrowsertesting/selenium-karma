/* global describe it expect assert */
import sinon from 'sinon';
import { describe, it, before, after } from 'mocha';
import { assert, expect } from 'chai';

describe('sourceFile.js', function () {
    //String related
    describe('testFunction', function () {
      it('should return 2', function(){
          expect(adder(1,1)).to.equal(2);
      });
    });
});