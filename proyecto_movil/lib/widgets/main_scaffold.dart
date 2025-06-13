import 'package:flutter/material.dart';
import 'menu_lateral.dart';
import '../widgets/user_info_modal.dart';

class MainScaffold extends StatefulWidget {
  final Widget content;
  final String title;
  final VoidCallback onLogout;
  final String id;
  final String username;
  final String fullName;
  final String email;
  final String role;

  const MainScaffold({
    Key? key,
    required this.content,
    required this.title,
    required this.onLogout,
    required this.id,
    required this.username,
    required this.fullName,
    required this.email,
    required this.role,
  }) : super(key: key);

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
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

  void _showUserInfoModal() {
    showDialog(
      context: context,
      builder: (context) {
        return UserInfoModal(
          id: widget.id,
          username: widget.username,
          fullName: widget.fullName,
          email: widget.email,
          role: widget.role,
          onLogout: widget.onLogout,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        leading: IconButton(
          icon: Icon(menuOpen ? Icons.menu_open : Icons.menu),
          onPressed: toggleMenu,
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle),
            onPressed: _showUserInfoModal,
          ),
          if (widget.onLogout != null)
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: widget.onLogout,
            ),
        ],
      ),
      body: Row(
        children: [
          if (menuOpen)
            MenuLateral(
              onCloseMenu: closeMenu,
              id: widget.id,
              username: widget.username,
              fullName: widget.fullName,
              email: widget.email,
              role: widget.role,
              onLogout: widget.onLogout,
            ),
          Expanded(
            child: widget.content,
          ),
        ],
      ),
    );
  }
}
