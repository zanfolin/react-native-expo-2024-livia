import { Stack } from "expo-router";
import { AppProvider } from "../hooks";

export default function layout() {
    return ( 
    <AppProvider>
    <Stack />
    </AppProvider>
    );
}
