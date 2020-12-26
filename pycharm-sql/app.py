from flask import Flask, jsonify, request, make_response
from flask_httpauth import HTTPBasicAuth
import sqlite3
from datetime import datetime

# Criando objeto da classe HTTP
auth = HTTPBasicAuth()

# Criando objeto da classe Flask
app = Flask(__name__)

# Lista do conjuntos que devem acionar a bomba
lista_bomba = [
    {
        "idConjunto": "1",
        "tempo": "10"
    },
    {
        "idConjunto": "2",
        "tempo": "7"
    }
]

# Lista de vegetais e quantidade de água necessária
vegetais = [
    {
        "tipo": "alface",
        "temperatura": "25",
        "umidade": "75"
    },
    {
        "tipo": "tomate",
        "temperatura": "25",
        "umidade": "60"
    }
]

# Qual tipo de vegetal é cada conjunto [0] - Conjunto 1, [1] - Conjunto 2,
conjunto_vegetal = ['', '']


# Nodemcu realiza para verificar se deve ligar a bomba
@app.route('/bomba', methods=['GET'])
def obtem_bomba():
    global lista_bomba
    lista_bomba_aux = lista_bomba
    lista_bomba = []
    return jsonify({'lista_bomba': lista_bomba_aux})


# Nodemcu realiza para inserir informação no banco
@app.route('/informacao', methods=['POST'])
def add_info():
    global conjunto_vegetal

    # Conexão com o banco
    banco = sqlite3.connect('banco.db')
    cursor = banco.cursor()

    # Leitura dos parâmetros recebidos
    idConjunto = request.json.get('idConjunto')
    temperatura = request.json.get('temperatura')
    umidade = request.json.get('umidade')
    data = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    if (conjunto_vegetal[int(idConjunto)-1] != ''):
        # Inserção no banco
        query_str = 'INSERT INTO Sistema (idConjunto,temperatura,umidade,tipo,data) VALUES (\'' \
                    + idConjunto + '\',\'' + temperatura + '\',\'' + umidade + '\',\'' + conjunto_vegetal[int(idConjunto)-1] + '\',\'' + data + '\')'
        cursor.execute(query_str)

        # Analisando situação do vegetal
        verifica_medidas(idConjunto, temperatura, umidade, conjunto_vegetal[int(idConjunto)-1])

        try:
            banco.commit()
            return make_response(jsonify('Objeto cadastrado!'), 200)
        except Exception as e:
            return make_response(jsonify('Objeto não cadastrado!'), 406)

    else:
        return make_response(jsonify('Objeto não cadastrado, informe o tipo do vegetal!'), 406)

# App mobile realiza para obter dados do banco
@app.route('/informacao', methods=['GET'])
def obtem_info():
    # Conexão com o banco
    banco = sqlite3.connect('banco.db')
    cursor = banco.cursor()

    # Lista de informação
    lista_info = []

    # Selecionando os dados do banco
    query_str = 'SELECT * FROM Sistema'
    info = cursor.execute(query_str).fetchall()
    for item in info:
        lista_info.append({"idConjunto": item[1], "temperatura": item
        [2], "umidade": item[3], "tipo": item[4], "data": item[5]})

    return jsonify({'lista_info': lista_info})


# App mobile realiza indicar tipo de vegetal
@app.route('/vegetal', methods=['POST'])
def add_vegetal():
    global conjunto_vegetal
    tipo = request.json.get('tipo')
    idConjunto = request.json.get('idConjunto')

    try:
        conjunto_vegetal[int(idConjunto) - 1] = tipo
        return make_response(jsonify('Vegetal cadastrado!'), 200)
    except:
        return make_response(jsonify('Erro ao cadastrar vegetal'), 406)


# App mobile realiza para ligar bomba
@app.route('/bomba', methods=['POST'])
def add_bomba():
    global lista_bomba

    # Leitura dos parâmetros recebidos
    idConjunto = request.json.get('idConjunto')
    tempo = request.json.get('tempo')

    try:
        lista_bomba.append({"idConjunto": idConjunto, "tempo": tempo})
        return make_response(jsonify('A bomba será acionada!'), 200)
    except:
        return make_response(jsonify('Erro ao acionar bomba'), 406)


# Verifica se precisa acionar a bomba e adiciona na lista de bomba
def verifica_medidas(idConjunto, temperatura, umidade, tipo):
    global lista_bomba, vegetais
    vegetal = next(item for item in vegetais if item["tipo"] == tipo)

    if float(temperatura) > 0.3 * float(vegetal['temperatura']) and float(umidade) < 0.8 * float(vegetal['umidade']):
        lista_bomba.append({"idConjunto": idConjunto, "tempo": "8"})

    return True


if __name__ == "__main__":
    print("Aplicação no ar!")
    app.run(host='0.0.0.0', debug=True, port=3001)
