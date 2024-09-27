import { createContext, useContext, useEffect, useState } from "react";
import { useUsersDatabase } from "../../database/useUsersDatabase"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";


const AuthContext = createContext({});

export const Role = {
    SUPER: "SUPER",
    ADM: "ADM",
    USER: "USER"
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null,
    });

    const { authUser } = useUsersDatabase(); 

    useEffect(() => {
        const loadStoragedData = async () => {
            const storagedUser = await AsyncStorage.getItem("@payments:user");

            if (storagedUser) {
                setUser({
                    autenticated: true,
                    user: JSON.parse(storagedUser),
                    role: JSON.parse(storagedUser).role,
                });
            } else {
                setUser({
                    autenticated: false,
                    user: null,
                    role: null,
                });
            }
        };

        loadStoragedData();
    },[]);

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password }); 
            if (!response) {
            setUser({
                autenticated: false,
                user: null,
                role: null,
            });
            throw new Error("usuário ou senha inválidos");
        }

        await AsyncStorage.setItem("@payment:user", JSON.stringify(response)); 

        setUser({
            autenticated: true,
            user: response,
            role: response.role,
        });
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        setUser({});
    };

    if (user?.autenticated === null) {
        return ( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 28, marginTop: 15}}>
                carregando dados do usuário
            </Text>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        );
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}