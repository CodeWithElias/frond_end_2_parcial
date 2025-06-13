import 'package:flutter/material.dart';
import 'models/user.dart';
import 'services/auth_service.dart';
import 'screens/login_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/estudiantes_screen.dart';
import 'screens/padres_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final AuthService _authService = AuthService();

  @override
  void initState() {
    super.initState();
    _authService.userStream.listen((user) {
      setState(() {});
    });
  }

  @override
  void dispose() {
    _authService.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Proyecto Movil',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: ProfileScreen(),
      routes: {
        '/login': (context) => LoginScreen(
              onLoginSuccess: () {
                setState(() {});
              },
            ),
        '/profile': (context) => ProfileScreen(),
        '/estudiantes': (context) => EstudiantesScreen(),
        '/padres': (context) => PadresScreen(),
      },
    );
  }
}
