import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const StatCard = ({ title, value, icon, color }: any) => (
    <View className={`bg-surface p-4 rounded-xl shadow-sm border border-border flex-1 mx-1`}>
        <View className={`w-10 h-10 rounded-full justify-center items-center mb-2 ${color}`}>
            <Text className="text-xl">{icon}</Text>
        </View>
        <Text className="text-muted text-xs font-medium">{title}</Text>
        <Text className="text-xl font-bold text-text mt-1">{value}</Text>
    </View>
);

export const DashboardScreen = ({ navigation }: any) => {
    return (
        <View className="flex-1 bg-background">
            <View className="bg-surface p-6 pt-12 border-b border-border">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-muted text-sm">Welcome back,</Text>
                        <Text className="text-2xl font-bold text-text">Dr. Admin</Text>
                    </View>
                    <View className="w-10 h-10 bg-primary rounded-full justify-center items-center">
                        <Text className="text-white font-bold">DA</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 p-4">
                <Text className="text-lg font-bold text-text mb-4">Overview</Text>

                <View className="flex-row mb-4">
                    <StatCard title="Patients" value="1,248" icon="👥" color="bg-blue-100" />
                    <StatCard title="Appointments" value="12" icon="📅" color="bg-green-100" />
                </View>
                <View className="flex-row mb-6">
                    <StatCard title="Tasks" value="5" icon="✅" color="bg-orange-100" />
                    <StatCard title="Messages" value="3" icon="💬" color="bg-purple-100" />
                </View>

                <Text className="text-lg font-bold text-text mb-4">Quick Actions</Text>

                <TouchableOpacity
                    className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row items-center"
                    onPress={() => navigation.navigate('PatientList')}
                >
                    <View className="w-10 h-10 bg-blue-50 rounded-full justify-center items-center mr-4">
                        <Text>📋</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-text">Patient List</Text>
                        <Text className="text-muted text-xs">Search and view patient records</Text>
                    </View>
                    <Text className="text-muted">›</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row items-center">
                    <View className="w-10 h-10 bg-green-50 rounded-full justify-center items-center mr-4">
                        <Text>➕</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-bold text-text">New Appointment</Text>
                        <Text className="text-muted text-xs">Schedule a visit</Text>
                    </View>
                    <Text className="text-muted">›</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
