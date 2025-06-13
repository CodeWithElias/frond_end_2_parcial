import 'package:flutter/material.dart';

class UserInfoModal extends StatelessWidget {
  final String id;
  final String username;
  final String fullName;
  final String email;
  final String role;
  final VoidCallback onLogout;

  const UserInfoModal({
    Key? key,
    required this.id,
    required this.username,
    required this.fullName,
    required this.email,
    required this.role,
    required this.onLogout,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Información del Usuario'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('ID: $id'),
          const SizedBox(height: 8),
          Text('Nombre completo: $fullName'),
          const SizedBox(height: 8),
          Text('Nombre de usuario: $username'),
          const SizedBox(height: 8),
          Text('Email: $email'),
          const SizedBox(height: 8),
          Text('Rol: $role'),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              onLogout();
            },
            child: const Text('Cerrar sesión'),
          ),
        ],
      ),
    );
  }
}
