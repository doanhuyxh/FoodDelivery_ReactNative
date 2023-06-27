import {Image, Text, View} from "react-native";
import Rect, {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

function OrderPrepairingScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(()=>{
            navigation.navigate('Delivery');
        }, 2000)
    }, []);


    return (
        <View className="flex-1 bg-white justify-center items-center">
            <Image source={require('../assets/images/delivery.gif')} className="w-80 h-80"/>
        </View>
    );
}

export default OrderPrepairingScreen;