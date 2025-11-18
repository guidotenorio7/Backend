import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function UserCard({ data, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.nombre}>{data.fullName || data.username}</Text>
        <Text style={styles.username}>@{data.username}</Text>
        <Text style={styles.email}>{data.email}</Text>
        <View style={styles.rolesContainer}>
          {data.roles && data.roles.map((role, idx) => (
            <View key={idx} style={styles.roleBadge}>
              <Text style={styles.roleText}>{role}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.editButton} onPress={() => onEdit(data)}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={() => onDelete(data.uuid)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  cardContent: {
    marginBottom: 10,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  email: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  rolesContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  roleBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginTop: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 6,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
