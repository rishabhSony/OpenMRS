import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { mobileAuthService } from '../services/auth';

export const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        const isAuthenticated = await mobileAuthService.init();
        if (isAuthenticated) {
            navigation.replace('Dashboard');
        }
    };

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }

        setIsLoading(true);
        try {
            await mobileAuthService.login(username, password);
            navigation.replace('Dashboard');
        } catch (error) {
            Alert.alert('Error', 'Invalid credentials or server error');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-background justify-center items-center p-6">
            <View className="w-full max-w-sm bg-surface p-8 rounded-2xl shadow-lg">
                <View className="items-center mb-8">
                    <View className="w-16 h-16 bg-primary rounded-xl justify-center items-center mb-4">
                        <Text className="text-white text-3xl font-bold">+</Text>
                    </View>
                    <Text className="text-2xl font-bold text-text">OpenMRS Enterprise</Text>
                    <Text className="text-muted mt-2">Mobile Access</Text>
                </View>

                <View className="space-y-4">
                    <TextInput
                        className="w-full bg-background border border-border rounded-lg p-4 text-text"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        placeholderTextColor="#868e96"
                    />
                    <TextInput
                        className="w-full bg-background border border-border rounded-lg p-4 text-text"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#868e96"
                    />

                    <TouchableOpacity
                        className="w-full bg-primary p-4 rounded-lg items-center mt-4"
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-bold text-lg">Login</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
