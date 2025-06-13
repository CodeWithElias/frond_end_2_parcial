import 'package:flutter/material.dart';

class MenuLateral extends StatelessWidget {
  final VoidCallback onCloseMenu;
  final String id;
  final String username;
  final String fullName;
  final String email;
  final String role;
  final VoidCallback onLogout;

  const MenuLateral({
    Key? key,
    required this.onCloseMenu,
    required this.id,
    required this.username,
    required this.fullName,
    required this.email,
    required this.role,
    required this.onLogout,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[200],
      child: ListView(
        children: [
          ListTile(
            title: const Text('Profile'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/profile');
            },
          ),
          ListTile(
            title: const Text('Estudiantes'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/estudiantes');
            },
          ),
          ListTile(
            title: const Text('Padres'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/padres');
            },
          ),
          ListTile(
            title: const Text('Profesores'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/profesores');
            },
          ),
          ListTile(
            title: const Text('Tutores'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/tutores');
            },
          ),
          ListTile(
            title: const Text('Materias'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/materias');
            },
          ),
          ListTile(
            title: const Text('Cursos'),
            onTap: () {
              onCloseMenu();
              Navigator.of(context).pushReplacementNamed('/cursos');
            },
          ),
        ],
      ),
    );
  }
}
