import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

const MOCK_PATIENTS = [
    { id: '1', name: 'John Doe', age: 45, gender: 'M', id_number: '100-201' },
    { id: '2', name: 'Jane Smith', age: 32, gender: 'F', id_number: '100-202' },
    { id: '3', name: 'Robert Johnson', age: 58, gender: 'M', id_number: '100-203' },
    { id: '4', name: 'Emily Davis', age: 24, gender: 'F', id_number: '100-204' },
    { id: '5', name: 'Michael Brown', age: 67, gender: 'M', id_number: '100-205' },
];

export const PatientListScreen = () => {
    return (
        <StyledView className="flex-1 bg-background">
            <StyledView className="p-4 bg-surface border-b border-border">
                <StyledInput
                    className="bg-background border border-border rounded-lg p-3 text-text"
                    placeholder="Search patients..."
                />
            </StyledView>

            <FlatList
                data={MOCK_PATIENTS}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <StyledView className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row items-center">
                            <StyledView className="w-12 h-12 bg-primary rounded-full justify-center items-center mr-4">
                                <StyledText className="text-white font-bold text-lg">
                                    {item.name.charAt(0)}
                                </StyledText>
                            </StyledView>
                            <StyledView className="flex-1">
                                <StyledText className="font-bold text-text text-lg">{item.name}</StyledText>
                                <StyledText className="text-muted text-sm">
                                    {item.gender} • {item.age} yrs • ID: {item.id_number}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </TouchableOpacity>
                )}
            />
        </StyledView>
    );
};
