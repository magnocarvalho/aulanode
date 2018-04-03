// describe('produdosController', function(){

//     it('listagem jason', function()
//     {
//         console.log("test de loucura");
//     })
// });
var express = require('../config/express')();
var request = require('supertest')();
describe('ProdutosController', function(){
    it('listagem json', function(done){
        request.get('http://localhost:3000/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
    });
    it('#cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos')
            .send({titulo: "", descricao: "novo livro"})
            .expect(400, done);
    });
    it('#cadastro de um novo produto com tudo preenchido', function (done) {
        request.post('/produtos')
            .send({titulo:"novo livro",preco:20.50,descricao:"livro de teste"})
            .expect(302, done)
    });
});