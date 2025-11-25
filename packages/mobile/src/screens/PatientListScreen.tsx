import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { patientService } from '@openmrs-enterprise/core';
import type { Patient } from '@openmrs-enterprise/core';

export const PatientListScreen = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async (query: string = '') => {
        setIsLoading(true);
        try {
            // If query is empty, we might want to fetch recent patients or just a default list
            // OpenMRS API usually requires a query for search, or we can use a different endpoint for "all"
            // For now, let's search for "a" if empty to get some results, or handle empty state
            const results = await patientService.searchPatients(query || 'a');
            setPatients(results);
        } catch (error) {
            console.error('Failed to fetch patients', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        // Debounce could be added here
        if (text.length > 1) {
            fetchPatients(text);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <View className="p-4 bg-surface border-b border-border">
                <TextInput
                    className="bg-background border border-border rounded-lg p-3 text-text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#868e96"
                />
            </View>

            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0066cc" />
                </View>
            ) : (
                <FlatList
                    data={patients}
                    keyExtractor={item => item.uuid}
                    contentContainerStyle={{ padding: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row items-center">
                                <View className="w-12 h-12 bg-primary rounded-full justify-center items-center mr-4">
                                    <Text className="text-white font-bold text-lg">
                                        {item.person.display?.charAt(0) || '?'}
                                    </Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-bold text-text text-lg">{item.person.display}</Text>
                                    <Text className="text-muted text-sm">
                                        {item.person.gender} • {item.person.age} yrs • ID: {item.identifiers?.[0]?.identifier}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text className="text-center text-muted mt-10">No patients found</Text>
                    }
                />
            )}
        </View>
    );
};
