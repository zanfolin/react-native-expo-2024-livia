import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import { useAuth } from '../hooks/Auth';

export default function App() {
  const { signIn, signOut } = useAuth();

  const handleEntrarSuper = async () => {
    try {
      await signIn({ email: "super@email.com", password: "Super123!" })
      router.replace("/");
    } catch (error) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>minha primeira janela</Text>
      <Button title="SignIn Super" onPress={handleEntrarSuper} />
      <Button
        title="SignIn Adm"
        onPress={() => signIn({ email: "adm@email.com", password: "Adm123!" })}
      />
      <Button
        title="SignIn User"
        onPress={() =>
          signIn({ email: "user@email.com", password: "User123!" })
        }
      />
      <Button title="sobre" onPress={()=>router.push("/about")} />
        <Button
         title="sair do aplicativo"
         onPress={()=>BackHandler.exitApp()}
        />
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
    gap: 15,
  },
  title: {
    fontFamily: "bold",
    fontSize: 20,
  },
});
