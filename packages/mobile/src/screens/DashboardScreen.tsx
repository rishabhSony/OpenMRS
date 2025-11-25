import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);

const StatCard = ({ title, value, icon, color }: any) => (
    <StyledView className={`bg-surface p-4 rounded-xl shadow-sm border border-border flex-1 mx-1`}>
        <StyledView className={`w-10 h-10 rounded-full justify-center items-center mb-2 ${color}`}>
            <StyledText className="text-xl">{icon}</StyledText>
        </StyledView>
        <StyledText className="text-muted text-xs font-medium">{title}</StyledText>
        <StyledText className="text-xl font-bold text-text mt-1">{value}</StyledText>
    </StyledView>
);

export const DashboardScreen = ({ navigation }: any) => {
    return (
        <StyledView className="flex-1 bg-background">
            <StyledView className="bg-surface p-6 pt-12 border-b border-border">
                <StyledView className="flex-row justify-between items-center">
                    <StyledView>
                        <StyledText className="text-muted text-sm">Welcome back,</StyledText>
                        <StyledText className="text-2xl font-bold text-text">Dr. Admin</StyledText>
                    </StyledView>
                    <StyledView className="w-10 h-10 bg-primary rounded-full justify-center items-center">
                        <StyledText className="text-white font-bold">DA</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>

            <ScrollView className="flex-1 p-4">
                <StyledText className="text-lg font-bold text-text mb-4">Overview</StyledText>

                <StyledView className="flex-row mb-4">
                    <StatCard title="Patients" value="1,248" icon="👥" color="bg-blue-100" />
                    <StatCard title="Appointments" value="12" icon="📅" color="bg-green-100" />
                </StyledView>
                <StyledView className="flex-row mb-6">
                    <StatCard title="Tasks" value="5" icon="✅" color="bg-orange-100" />
                    <StatCard title="Messages" value="3" icon="💬" color="bg-purple-100" />
                </StyledView>

                <StyledText className="text-lg font-bold text-text mb-4">Quick Actions</StyledText>

                <StyledButton
                    className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row items-center"
                    onPress={() => navigation.navigate('PatientList')}
                >
                    <StyledView className="w-10 h-10 bg-blue-50 rounded-full justify-center items-center mr-4">
                        <StyledText>📋</StyledText>
                    </StyledView>
                    <StyledView className="flex-1">
                        <StyledText className="font-bold text-text">Patient List</StyledText>
                        <StyledText className="text-muted text-xs">Search and view patient records</StyledText>
                    </StyledView>
                    <StyledText className="text-muted">›</StyledText>
                </StyledButton>

                <StyledButton className="bg-surface p-4 rounded-xl border border-border mb-3 flex-row items-center">
                    <StyledView className="w-10 h-10 bg-green-50 rounded-full justify-center items-center mr-4">
                        <StyledText>➕</StyledText>
                    </StyledView>
                    <StyledView className="flex-1">
                        <StyledText className="font-bold text-text">New Appointment</StyledText>
                        <StyledText className="text-muted text-xs">Schedule a visit</StyledText>
                    </StyledView>
                    <StyledText className="text-muted">›</StyledText>
                </StyledButton>
            </ScrollView>
        </StyledView>
    );
};
