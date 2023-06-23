import 'dart:convert';
import 'package:http/http.dart' as http;

class UserService {
  static const String baseUrl = 'https://your-api-url.com'; // Replace with your API URL

  // Method to send a reset password email
  static Future<String> sendResetPasswordEmail(String email) async {
    final url = Uri.parse('$baseUrl/sendResetPasswordEmail');
    final response = await http.post(
      url,
      body: jsonEncode({'email': email}),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      return 'Reset password email sent successfully';
    } else {
      throw Exception('Failed to send reset password email');
    }
  }

  // Method to verify reset password OTP
  static Future<String> verifyResetPasswordOTP(
      String email, String otp, String newPassword) async {
    final url = Uri.parse('$baseUrl/verifyResetPasswordOTP');
    final response = await http.post(
      url,
      body: jsonEncode({'email': email, 'otp': otp, 'newPassword': newPassword}),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      return 'Password reset successfully';
    } else {
      throw Exception('Failed to verify reset password OTP');
    }
  }

  // Method to get all users (requires admin role)
  static Future<List<dynamic>> getAllUsers(String token) async {
    final url = Uri.parse('$baseUrl/getAllUsers');
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final users = jsonDecode(response.body);
      return users;
    } else {
      throw Exception('Failed to get users');
    }
  }

  // Method to register a new user
  static Future<Map<String, dynamic>> register(
      String name, String email, String password) async {
    final url = Uri.parse('$baseUrl/register');
    final response = await http.post(
      url,
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return {
        'token': data['token'],
        'user': data['user'],
      };
    } else {
      throw Exception('Failed to register user');
    }
  }

  // Method to log in a user
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');
    final response = await http.post(
      url,
      body: jsonEncode({'email': email, 'password': password}),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return {
        'token': data['token'],
        'user': data['user'],
      };
    } else {
      throw Exception('Failed to log in');
    }
  }

  // Method to get a user by ID (requires user's own ID or admin role)
  static Future<dynamic> getUser(String userId, String token) async {
    final url = Uri.parse('$baseUrl/getUser/$userId');
    final response = await http.get(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      final user = jsonDecode(response.body);
      return user;
    } else {
      throw Exception('Failed to get user');
    }
  }

  // Method to delete a user by ID (requires user's own ID or admin role)
  static Future<String> deleteUser(String userId, String token) async {
    final url = Uri.parse('$baseUrl/deleteUser/$userId');
    final response = await http.delete(
      url,
      headers: {'Authorization': 'Bearer $token'},
    );

    if (response.statusCode == 200) {
      return 'User deleted successfully';
    } else {
      throw Exception('Failed to delete user');
    }
  }

  // Method to update a user by ID (requires user's own ID or admin role)
  static Future<dynamic> updateUser(
      String userId, String name, String email, String token) async {
    final url = Uri.parse('$baseUrl/updateUser/$userId');
    final response = await http.put(
      url,
      body: jsonEncode({'name': name, 'email': email}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final user = jsonDecode(response.body);
      return user;
    } else {
      throw Exception('Failed to update user');
    }
  }
}
