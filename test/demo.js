const chai = require('chai')
const assert = chai.assert;
const should = chai.should;
const expect = chai.expect;

describe('Espect Check',function(){
    let name = "aarvi"
    res ={
        'id' :101,
        'name' : 'aarvi',
        'email' : 'aarvi@gmail.com'

    }
    it('Check String',function(){
        expect(name).to.be.a('string')
    })
    it('Check name', function(){
        expect(name).to.equal('aarvi')
    })


})

