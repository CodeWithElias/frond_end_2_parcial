import 'package:flutter/material.dart';
import '../widgets/main_scaffold.dart';
import '../services/user_state.dart';
import '../services/auth_service.dart';

class EstudiantesScreen extends StatelessWidget {
  const EstudiantesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = UserState.currentUser;

    return MainScaffold(
      title: 'Estudiantes',
      id: user?.id ?? '',
      username: user?.username ?? '',
      fullName: user?.fullName ?? '',
      email: user?.email ?? '',
      role: user?.role ?? '',
      onLogout: () {
        AuthService().logout();
        UserState.clearUser();
        Navigator.of(context).pushReplacementNamed('/login');
      },
      content: const Center(
        child: Text('Pantalla de Estudiantes'),
      ),
    );
  }
}
