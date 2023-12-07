import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { loginStyles, theme } from './../utils/Styles'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login.tsx: Successfully logged in");
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Login.tsx: Successfully created new user");
        } catch (error: any) {
            console.log(error);
            alert('Sign up failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={loginStyles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput value={email} style={loginStyles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput value={password} style={loginStyles.input} placeholder="password" autoCapitalize="none" secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>

                { loading ? (
                <ActivityIndicator size="large" color={theme.colors.accent} />
                ) : (
                <>
                <Button title="Login" onPress={signIn}/>
                <Button title="Create account" onPress={signUp}/>
                </>
                )}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login
