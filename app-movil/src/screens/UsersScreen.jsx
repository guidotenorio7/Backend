import {
  View,
  FlatList,
  Modal,
  Pressable,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import Screen from '../components/Screen';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import { useSession } from '../components/Session';
import userService from '../services/userService';

export default function UsersScreen() {
  const { isInitiated, token: sessionToken } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [token, setToken] = useState(null);

  // Obtener token del Session context después del login
  useEffect(() => {
    if (sessionToken) {
      setToken(sessionToken);
    }
  }, [sessionToken]);

  useEffect(() => {
    if (token) {
      loadUsers();
    }
  }, [token]);

  const loadUsers = async () => {
    setLoading(true);
    const result = await userService.getUsers(token);
    if (result.success) {
      setUsers(result.data);
    } else {
      Alert.alert('Error', result.error);
    }
    setLoading(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (uuid) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este usuario?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Eliminar',
          onPress: () => deleteUser(uuid),
          style: 'destructive',
        },
      ]
    );
  };

  const deleteUser = async (uuid) => {
    setFormLoading(true);
    const result = await userService.deleteUser(uuid, token);
    setFormLoading(false);
    if (result.success) {
      Alert.alert('Éxito', 'Usuario eliminado correctamente');
      loadUsers();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    let result;
    if (selectedUser) {
      result = await userService.updateUser(selectedUser.uuid, formData, token);
    } else {
      result = await userService.createUser(formData, token);
    }
    setFormLoading(false);

    if (result.success) {
      Alert.alert('Éxito', selectedUser ? 'Usuario actualizado' : 'Usuario creado');
      setShowForm(false);
      setSelectedUser(null);
      loadUsers();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const renderUserCard = ({ item }) => (
    <UserCard
      data={item}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Gestor de Usuarios</Text>
      <Text style={styles.headerSubtitle}>
        Total: {users.length} usuario{users.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  if (loading) {
    return (
      <Screen title="Usuarios">
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando usuarios...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="Usuarios">
      <View style={styles.container}>
        <Pressable
          style={styles.addButton}
          onPress={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Nuevo Usuario</Text>
        </Pressable>

        {users.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay usuarios registrados</Text>
          </View>
        ) : (
          <FlatList
            data={users}
            renderItem={renderUserCard}
            keyExtractor={(item) => item.uuid}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />
        )}

        <Modal
          visible={showForm}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCloseForm}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <UserForm
                initialData={selectedUser}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseForm}
                loading={formLoading}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    margin: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,
    maxHeight: '90%',
  },
});
