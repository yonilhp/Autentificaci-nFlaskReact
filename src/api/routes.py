from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt  # Importa Bcrypt
import jwt
import datetime
api = Blueprint('api', __name__)

# Inicializa Bcrypt
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": "*"}})

# Define una clave secreta para la codificación del JWT
SECRET_KEY = 'your_secret_key_here'

@api.route('/signin', methods=['POST'])
def signin():
    try:
        body = request.get_json()
        if not body:
            return jsonify({"error": "Falta request body"}), 400

        email = body.get('email')
        password = body.get('password')

        if not email or not password:
            return jsonify({"error": "Email y contraseña son obligatorios"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Credenciales inválidas"}), 401

        # Generar un token JWT
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.now() + datetime.timedelta(hours=1)  # Expira en 1 hora
        }, SECRET_KEY, algorithm='HS256')

        # Devolver el token y un mensaje de éxito
        return jsonify({
            "message": "Inicio de sesión exitoso",
            "token": token
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


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

    # **Prueba para verificar si el hash y la contraseña son válidos**
    # Comprobamos si el hash generado puede validarse correctamente
    password_is_valid = bcrypt.check_password_hash(hashed_password, password)

    if not password_is_valid:
        return jsonify({"error": "Hubo un problema al verificar la contraseña hasheada"}), 500

    # Si todo está bien, continúa creando el nuevo usuario
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
