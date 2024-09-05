from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt  # Importa Bcrypt

api = Blueprint('api', __name__)

# Inicializa Bcrypt
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": "*"}})

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if not body:
        return jsonify({"error": "Falta request body"}), 400

    # Extrae datos del request
    first_name = body.get('first_name')
    last_name = body.get('last_name')
    email = body.get('email')
    password = body.get('password')
    confirm_password = body.get('confirm_password')

    if not all([first_name, last_name, email, password]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    if password != confirm_password:
        return jsonify({"error": "Las contraseñas no coinciden"}), 400

    # Verificar si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "El usuario ya existe"}), 400

    # Crear un nuevo usuario con la contraseña hasheada
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password  # Guarda la contraseña hasheada
    )

    # Agregar el nuevo usuario a la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado"}), 201

@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        user_list = [user.serialize() for user in users]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
