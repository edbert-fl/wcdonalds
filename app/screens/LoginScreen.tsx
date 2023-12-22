import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { theme } from '../utils/StylesUtils'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/TypesUtils';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    }

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log("Successfully logged in");
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const loginAsGuest = async () => {
        setLoading(true);
        try {
            const response = await signInAnonymously(FIREBASE_AUTH)
            console.log("Successfully logged in as guest")
        } catch (error: any) {
            console.log(error);
            alert('Guest login failed failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }
 
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>WcDonald's</Text>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
            <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                enablesReturnKeyAutomatically
            />
            <TextInput
                value={password}
                style={styles.input}
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
                    <TouchableOpacity style={styles.button} onPress={signIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.secondaryButton} onPress={loginAsGuest}>
                        <Text style={styles.buttonText}>Login as guest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkContainer} onPress={handleSignUp}>
                        <Text style={styles.text}>Don't have an account?</Text>
                        <Text style={styles.link}>Sign up instead</Text>
                    </TouchableOpacity>
                </View>
            )}
            </KeyboardAvoidingView>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    linkContainer: {
        marginTop: 50,
        height: 'auto',
        display: 'flex',
        alignItems: 'center'
    },
    text:{
        color: theme.colors.text
    },
    link: {
        color: theme.colors.link,
        fontSize: 16
    },
    logo: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.primary,
    },
    formContainer: {
      width: '100%',
    },
    input: {
      marginVertical: 10,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: theme.colors.surface,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      padding: 15,
      marginTop: 20,
      alignItems: 'center',
    },
    secondaryButton: {
      backgroundColor: theme.colors.accent,
      borderRadius: 5,
      padding: 15,
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    guestLoginButton: {
      backgroundColor: theme.colors.success,
      borderRadius: 5,
      padding: 15,
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default LoginScreen
