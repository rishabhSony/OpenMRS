import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);
const StyledButton = styled(TouchableOpacity);

export const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'Admin123') {
            navigation.replace('Dashboard');
        } else {
            Alert.alert('Error', 'Invalid credentials');
        }
    };

    return (
        <StyledView className="flex-1 bg-background justify-center items-center p-6">
            <StyledView className="w-full max-w-sm bg-surface p-8 rounded-2xl shadow-lg">
                <StyledView className="items-center mb-8">
                    <StyledView className="w-16 h-16 bg-primary rounded-xl justify-center items-center mb-4">
                        <StyledText className="text-white text-3xl font-bold">+</StyledText>
                    </StyledView>
                    <StyledText className="text-2xl font-bold text-text">OpenMRS Enterprise</StyledText>
                    <StyledText className="text-muted mt-2">Mobile Access</StyledText>
                </StyledView>

                <StyledView className="space-y-4">
                    <StyledInput
                        className="w-full bg-background border border-border rounded-lg p-4 text-text"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <StyledInput
                        className="w-full bg-background border border-border rounded-lg p-4 text-text"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <StyledButton
                        className="w-full bg-primary p-4 rounded-lg items-center mt-4"
                        onPress={handleLogin}
                    >
                        <StyledText className="text-white font-bold text-lg">Login</StyledText>
                    </StyledButton>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};
