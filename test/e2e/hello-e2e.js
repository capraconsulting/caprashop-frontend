'use strict';

describe('CapraController', function () {

    var ptor = protractor.getInstance();

    beforeEach(function () {
        ptor.get('/');
    });


    it('Message should be correct', function () {
        var h1 = ptor.findElement(protractor.By.id('message'));
        console.log(h1);
        expect(h1.getText()).toEqual("Hola!");
    });

});
