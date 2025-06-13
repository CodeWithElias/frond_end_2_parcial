import '../models/user.dart';

class UserState {
  static User? currentUser;

  static void setUser(User? user) {
    currentUser = user;
  }

  static void clearUser() {
    currentUser = null;
  }
}
