import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './TabScreens/HomeScreen';
import TrendingScreen from './TabScreens/TrendingScreen';
import ProfileScreen from './TabScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{headerShown: false}}>
            <Tab.Screen name="Trending" component={TrendingScreen}/>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}
