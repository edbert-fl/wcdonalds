import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
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
            <Text style={loginStyles.logo}>WcDonald's</Text>
            <KeyboardAvoidingView behavior='padding' style={loginStyles.formContainer}>
            <TextInput
                value={email}
                style={loginStyles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                enablesReturnKeyAutomatically
            />
            <TextInput
                value={password}
                style={loginStyles.input}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                enablesReturnKeyAutomatically={true}
            />

            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
                <View style={{marginTop: 50}}>
                    <TouchableOpacity style={loginStyles.button} onPress={signIn}>
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={loginStyles.secondaryButton} onPress={signUp}>
                        <Text style={loginStyles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            )}
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login
