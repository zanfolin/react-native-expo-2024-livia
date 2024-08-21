import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const { signIn, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style ={styles.title}>minha primeira janela</Text>
      <Button 
        title="SignIn Super" 
        onPress={() => 
          signIn({email: "super@email.com", password: "Super123!"})
        }
      />
      <Button 
        title="SignIn Adm" 
        onPress={() => 
          signIn({email: "adm@email.com", password: "Adm123!"})
        }
      />
      <Button 
        title="SignIn User" 
        onPress={() => 
          signIn({email: "user@email.com", password: "User123!"})
        }
      />

      <Button title="SignOut" onPress={() => signOut()}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
  },
});
