import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            nav: {
                dashboard: 'Dashboard',
                patients: 'Patients',
                clinical: 'Clinical',
                appointments: 'Appointments',
                reports: 'Reports',
                formBuilder: 'Form Builder'
            },
            // Common
            common: {
                loading: 'Loading...',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                search: 'Search',
                filter: 'Filter',
                export: 'Export',
                import: 'Import',
                submit: 'Submit',
                close: 'Close',
                back: 'Back',
                next: 'Next',
                previous: 'Previous',
                yes: 'Yes',
                no: 'No',
                confirm: 'Confirm',
                logout: 'Logout',
                login: 'Login'
            },
            // Authentication
            auth: {
                loginTitle: 'Hospital Management System',
                loginSubtitle: 'Sign in to access your account',
                username: 'Username',
                password: 'Password',
                rememberMe: 'Remember me',
                loginButton: 'Sign In',
                loggingIn: 'Signing in...',
                loginError: 'Invalid username or password',
                sessionExpired: 'Your session has expired. Please login again.'
            },
            // Dashboard
            dashboard: {
                welcome: 'Welcome back',
                overview: 'System Overview',
                totalPatients: 'Total Patients',
                activeVisits: 'Active Visits',
                todayAppointments: "Today's Appointments",
                pendingTasks: 'Pending Tasks',
                recentActivity: 'Recent Activity',
                quickActions: 'Quick Actions'
            },
            // Patients
            patients: {
                title: 'Patient Management',
                subtitle: 'Search, register, and manage patient records',
                searchPlaceholder: 'Search by name, ID, or phone...',
                registerNew: 'Register New Patient',
                patientList: 'Patient List',
                patientDetails: 'Patient Details',
                demographics: 'Demographics',
                contactInfo: 'Contact Information',
                medicalHistory: 'Medical History',
                firstName: 'First Name',
                lastName: 'Last Name',
                dateOfBirth: 'Date of Birth',
                gender: 'Gender',
                male: 'Male',
                female: 'Female',
                other: 'Other',
                phone: 'Phone Number',
                email: 'Email',
                address: 'Address',
                city: 'City',
                state: 'State',
                zipCode: 'Zip Code',
                country: 'Country'
            },
            // Clinical
            clinical: {
                title: 'Clinical Dashboard',
                subtitle: 'Patient vitals, medications, and lab results',
                selectPatient: 'Select Patient',
                recordVitals: 'Record Vitals',
                vitalsHistory: 'Vitals History',
                activeMedications: 'Active Medications',
                labResults: 'Lab Results',
                noDataAvailable: 'No data available',
                selectPatientPrompt: 'Select a patient to view clinical data'
            },
            // Vitals
            vitals: {
                bloodPressure: 'Blood Pressure',
                systolic: 'Systolic',
                diastolic: 'Diastolic',
                heartRate: 'Heart Rate',
                temperature: 'Temperature',
                respiratoryRate: 'Respiratory Rate',
                oxygenSaturation: 'Oxygen Saturation',
                weight: 'Weight',
                height: 'Height',
                bmi: 'BMI',
                notes: 'Notes',
                recordedAt: 'Recorded',
                latestVitals: 'Latest Vitals',
                vitalsTrends: 'Vitals Trends',
                saveVitals: 'Save Vitals'
            },
            // Appointments
            appointments: {
                title: 'Appointments',
                subtitle: 'Manage patient visits and schedules',
                scheduleNew: 'Schedule Appointment',
                calendarView: 'Calendar View',
                listView: 'List View',
                date: 'Date',
                time: 'Time',
                patient: 'Patient',
                provider: 'Provider',
                type: 'Type',
                status: 'Status',
                scheduled: 'Scheduled',
                completed: 'Completed',
                cancelled: 'Cancelled',
                conflictDetected: 'Conflict detected! This slot overlaps with an existing appointment.'
            },
            // Reports
            reports: {
                title: 'Reports & Analytics',
                subtitle: 'System metrics and data visualization',
                patientStats: 'Patient Statistics',
                appointmentMetrics: 'Appointment Metrics',
                genderDistribution: 'Gender Distribution',
                dailyAppointments: 'Daily Appointments',
                generateReport: 'Generate Report'
            },
            // Error Boundary
            error: {
                title: 'Oops! Something went wrong',
                message: "We're sorry for the inconvenience. The application encountered an unexpected error.",
                reloadApp: 'Reload Application',
                goBack: 'Go Back',
                errorDetails: 'Error Details (Development Only)'
            },
            // Settings
            settings: {
                language: 'Language',
                theme: 'Theme',
                lightMode: 'Light Mode',
                darkMode: 'Dark Mode',
                preferences: 'Preferences'
            }
        }
    },
    hi: {
        translation: {
            // Navigation
            nav: {
                dashboard: 'डैशबोर्ड',
                patients: 'मरीज़',
                clinical: 'क्लिनिकल',
                appointments: 'अपॉइंटमेंट',
                reports: 'रिपोर्ट',
                formBuilder: 'फॉर्म बिल्डर'
            },
            // Common
            common: {
                loading: 'लोड हो रहा है...',
                save: 'सहेजें',
                cancel: 'रद्द करें',
                delete: 'हटाएं',
                edit: 'संपादित करें',
                search: 'खोजें',
                filter: 'फ़िल्टर',
                export: 'निर्यात',
                import: 'आयात',
                submit: 'जमा करें',
                close: 'बंद करें',
                back: 'वापस',
                next: 'अगला',
                previous: 'पिछला',
                yes: 'हाँ',
                no: 'नहीं',
                confirm: 'पुष्टि करें',
                logout: 'लॉग आउट',
                login: 'लॉग इन'
            },
            // Authentication
            auth: {
                loginTitle: 'अस्पताल प्रबंधन प्रणाली',
                loginSubtitle: 'अपने खाते में साइन इन करें',
                username: 'उपयोगकर्ता नाम',
                password: 'पासवर्ड',
                rememberMe: 'मुझे याद रखें',
                loginButton: 'साइन इन करें',
                loggingIn: 'साइन इन हो रहा है...',
                loginError: 'अमान्य उपयोगकर्ता नाम या पासवर्ड',
                sessionExpired: 'आपका सत्र समाप्त हो गया है। कृपया फिर से लॉगिन करें।'
            },
            // Dashboard
            dashboard: {
                welcome: 'वापसी पर स्वागत है',
                overview: 'सिस्टम अवलोकन',
                totalPatients: 'कुल मरीज़',
                activeVisits: 'सक्रिय विज़िट',
                todayAppointments: 'आज के अपॉइंटमेंट',
                pendingTasks: 'लंबित कार्य',
                recentActivity: 'हाल की गतिविधि',
                quickActions: 'त्वरित कार्य'
            },
            // Patients
            patients: {
                title: 'मरीज़ प्रबंधन',
                subtitle: 'मरीज़ रिकॉर्ड खोजें, पंजीकृत करें और प्रबंधित करें',
                searchPlaceholder: 'नाम, आईडी या फोन से खोजें...',
                registerNew: 'नया मरीज़ पंजीकृत करें',
                patientList: 'मरीज़ सूची',
                patientDetails: 'मरीज़ विवरण',
                demographics: 'जनसांख्यिकी',
                contactInfo: 'संपर्क जानकारी',
                medicalHistory: 'चिकित्सा इतिहास',
                firstName: 'पहला नाम',
                lastName: 'अंतिम नाम',
                dateOfBirth: 'जन्म तिथि',
                gender: 'लिंग',
                male: 'पुरुष',
                female: 'महिला',
                other: 'अन्य',
                phone: 'फोन नंबर',
                email: 'ईमेल',
                address: 'पता',
                city: 'शहर',
                state: 'राज्य',
                zipCode: 'पिन कोड',
                country: 'देश'
            },
            // Clinical
            clinical: {
                title: 'क्लिनिकल डैशबोर्ड',
                subtitle: 'मरीज़ के वाइटल्स, दवाएं और लैब परिणाम',
                selectPatient: 'मरीज़ चुनें',
                recordVitals: 'वाइटल्स रिकॉर्ड करें',
                vitalsHistory: 'वाइटल्स इतिहास',
                activeMedications: 'सक्रिय दवाएं',
                labResults: 'लैब परिणाम',
                noDataAvailable: 'कोई डेटा उपलब्ध नहीं',
                selectPatientPrompt: 'क्लिनिकल डेटा देखने के लिए मरीज़ चुनें'
            },
            // Vitals
            vitals: {
                bloodPressure: 'रक्तचाप',
                systolic: 'सिस्टोलिक',
                diastolic: 'डायस्टोलिक',
                heartRate: 'हृदय गति',
                temperature: 'तापमान',
                respiratoryRate: 'श्वसन दर',
                oxygenSaturation: 'ऑक्सीजन संतृप्ति',
                weight: 'वजन',
                height: 'ऊंचाई',
                bmi: 'बीएमआई',
                notes: 'नोट्स',
                recordedAt: 'रिकॉर्ड किया गया',
                latestVitals: 'नवीनतम वाइटल्स',
                vitalsTrends: 'वाइटल्स रुझान',
                saveVitals: 'वाइटल्स सहेजें'
            },
            // Appointments
            appointments: {
                title: 'अपॉइंटमेंट',
                subtitle: 'मरीज़ विज़िट और शेड्यूल प्रबंधित करें',
                scheduleNew: 'अपॉइंटमेंट शेड्यूल करें',
                calendarView: 'कैलेंडर दृश्य',
                listView: 'सूची दृश्य',
                date: 'तारीख',
                time: 'समय',
                patient: 'मरीज़',
                provider: 'प्रदाता',
                type: 'प्रकार',
                status: 'स्थिति',
                scheduled: 'शेड्यूल किया गया',
                completed: 'पूर्ण',
                cancelled: 'रद्द',
                conflictDetected: 'संघर्ष का पता चला! यह स्लॉट मौजूदा अपॉइंटमेंट के साथ ओवरलैप करता है।'
            },
            // Reports
            reports: {
                title: 'रिपोर्ट और विश्लेषण',
                subtitle: 'सिस्टम मेट्रिक्स और डेटा विज़ुअलाइज़ेशन',
                patientStats: 'मरीज़ सांख्यिकी',
                appointmentMetrics: 'अपॉइंटमेंट मेट्रिक्स',
                genderDistribution: 'लिंग वितरण',
                dailyAppointments: 'दैनिक अपॉइंटमेंट',
                generateReport: 'रिपोर्ट जनरेट करें'
            },
            // Error Boundary
            error: {
                title: 'ओह! कुछ गलत हो गया',
                message: 'असुविधा के लिए खेद है। एप्लिकेशन में एक अप्रत्याशित त्रुटि आई।',
                reloadApp: 'एप्लिकेशन पुनः लोड करें',
                goBack: 'वापस जाएं',
                errorDetails: 'त्रुटि विवरण (केवल विकास)'
            },
            // Settings
            settings: {
                language: 'भाषा',
                theme: 'थीम',
                lightMode: 'लाइट मोड',
                darkMode: 'डार्क मोड',
                preferences: 'प्राथमिकताएं'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false // React already escapes values
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;
