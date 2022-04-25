import React from 'react'
import { HomeScreen, ExploreScreen, SearchScreen, SerieDetailScreen } from '../screens'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

const GlobalStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={HomeScreen} />
            <Stack.Screen name='explore' component={ExploreScreen} />
            <Stack.Screen name='search' component={SearchScreen} />
            <Stack.Screen name='serieDetail' component={SerieDetailScreen} />
        </Stack.Navigator>
    )
}

export default GlobalStack