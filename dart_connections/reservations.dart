import 'dart:convert';
import 'package:http/http.dart' as http;

class ReservationService {
  static const String baseUrl = 'http://your-api-base-url.com'; // Replace with your API base URL

  // Create a new reservation
  static Future<dynamic> createReservation(String userId, String technicianId, String timeSlot) async {
    final response = await http.post(
      '$baseUrl/reservations',
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'userId': userId,
        'technicianId': technicianId,
        'timeSlot': timeSlot,
      }),
    );

    if (response.statusCode == 201) {
      final reservation = jsonDecode(response.body);
      return reservation;
    } else if (response.statusCode == 409 && response.body.contains('Time slot already taken')) {
      throw Exception('Time slot already taken');
    } else {
      throw Exception('Failed to create reservation');
    }
  }

  // Get all reservations
  static Future<List<dynamic>> getAllReservations() async {
    final response = await http.get('$baseUrl/reservations');
    if (response.statusCode == 200) {
      final reservations = jsonDecode(response.body);
      return reservations;
    } else {
      throw Exception('Failed to fetch reservations');
    }
  }

  // Delete a reservation
  static Future<void> deleteReservation(String id) async {
    final response = await http.delete('$baseUrl/reservations/$id');
    if (response.statusCode == 200) {
      return;
    } else if (response.statusCode == 404 && response.body.contains('Reservation not found')) {
      throw Exception('Reservation not found');
    } else {
      throw Exception('Failed to delete reservation');
    }
  }
}