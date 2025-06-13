import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';
import 'user_state.dart';

class AuthService {
  User? _currentUser;

  final StreamController<User?> _userController = StreamController<User?>.broadcast();

  Stream<User?> get userStream => _userController.stream;

  User? get currentUser => _currentUser;

  // Use 10.0.2.2 to access host machine localhost from Android emulator
  final String baseUrl = 'http://192.168.1.11:8000';

  Future<bool> login(String username, String password) async {
    final url = Uri.parse("$baseUrl/auth/login/");
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({'username': username, 'password': password});

    try {
      final http.Response response = await http.post(url, headers: headers, body: body);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final usuario = data['usuario'];
        _currentUser = User(
          id: usuario['id'].toString(),
          username: usuario['username'] ?? '',
          email: usuario['correo'] ?? '',
          fullName: usuario['username'] ?? '',
          role: usuario['rol'] ?? '',
        );
        UserState.setUser(_currentUser);
        _userController.add(_currentUser);
        return true;
      } else {
        _currentUser = null;
        UserState.clearUser();
        _userController.add(null);
        return false;
      }
    } catch (e) {
      _currentUser = null;
      UserState.clearUser();
      _userController.add(null);
      return false;
    }
  }

  void logout() {
    _currentUser = null;
    UserState.clearUser();
    _userController.add(null);
  }

  void dispose() {
    _userController.close();
  }
}
