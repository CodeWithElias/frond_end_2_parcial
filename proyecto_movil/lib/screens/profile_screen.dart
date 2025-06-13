import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/auth_service.dart';
import '../services/user_state.dart';
import '../widgets/menu_lateral.dart';
import '../widgets/user_info_modal.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool menuOpen = false;

  void toggleMenu() {
    setState(() {
      menuOpen = !menuOpen;
    });
  }

  void closeMenu() {
    setState(() {
      menuOpen = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final user = UserState.currentUser;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        leading: IconButton(
          icon: Icon(menuOpen ? Icons.menu_open : Icons.menu),
          onPressed: toggleMenu,
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle),
            onPressed: () {
              final user = UserState.currentUser;
              showDialog(
                context: context,
                builder: (context) {
                  return UserInfoModal(
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
                  );
                },
              );
            },
          )
        ],
      ),
      body: Row(
        children: [
          if (menuOpen)
            Container(
              width: 200,
              color: Colors.grey[200],
              child: MenuLateral(
                onCloseMenu: closeMenu,
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
              ),
            ),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Bienvenidos al Colegio Ejemplar',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Información General',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'El Colegio Ejemplar es una institución educativa comprometida con la formación integral de sus estudiantes, promoviendo valores, excelencia académica y desarrollo personal.',
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Datos Importantes',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  const Text('Dirección: Calle Falsa 123, Ciudad Educativa'),
                  const Text('Teléfono: (123) 456-7890'),
                  const Text('Email: contactocolegioejemplar.edu'),
                  const Text('Horario: Lunes a Viernes, 7:00 AM - 3:00 PM'),
                  const Text('Director: Juan Pérez'),
                  const SizedBox(height: 24),
                  const Text(
                    'Misión',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Formar ciudadanos responsables, críticos y creativos, capaces de contribuir al desarrollo de la sociedad.',
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Visión',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Ser reconocidos como una institución líder en educación de calidad y valores.',
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
