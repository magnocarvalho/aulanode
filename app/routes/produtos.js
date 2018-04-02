module.exports = function(app) {

    var listaProdutos = function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results) {
            res.render('produtos/lista', {lista: results});
        });

        connection.end();
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/json',function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            res.json(resultados);
        });
        connection.end();
    });

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form', {errosValidacao:{}, produto:{}});
    });

    app.post('/produtos', function(req, res) {
        var produto = req.body;
        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosDao = new app.infra.ProdutosDAO(connection);

        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco','Formato inválido').isFloat();

        var errors = req.validationErrors();
        if(errors){
            res.render('produtos/form', {errosValidacao : errors, produto:produto});
            return;
        }

        produtosDao.salva(produto,function(erros,resultado){
                res.redirect("/produtos");
        });

        connection.end();
    });
}
