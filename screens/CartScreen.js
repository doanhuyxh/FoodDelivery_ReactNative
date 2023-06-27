import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {featured} from "../constants"
import {themeColor} from "../themes"
import * as Icon from "react-native-feather"
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurant} from "../slices/restaurantSlice";
import {deleteFromCart, selectCartItems, selectCartTotal} from "../slices/cartSlice";
import {useEffect, useState} from "react";

function CartScreen() {
    const deliveryfee = 2
    const restaurant = useSelector(selectRestaurant);

    const navigation = useNavigation();

    const cartItems = useSelector(selectCartItems);

    const cartTotal = useSelector(selectCartTotal);

    const dispatch = useDispatch();

    const [groupItem, setGroupItem] = useState({});

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item.id]) {
                group[item.id].push(item)
            } else {
                group[item.id] = [item]
            }
            return group;
        }, {});
        setGroupItem(items)
    }, [cartItems]);


    return (
        <View className="bg-white flex-1">
            {/*back button*/}
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{backgroundColor: themeColor.bgColor(1)}}
                    className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
                    <Icon.ArrowLeft strokeWidth={3} stroke={'white'}/>
                </TouchableOpacity>
            </View>
            <View>
                <Text className="text-center font-bold">Your cart</Text>
                <Text className="text-center text-gray-500">{restaurant.name}</Text>
            </View>
            {/* delivery time */}
            <View
                style={{backgroundColor: themeColor.bgColor(0.2)}}
                className="flex-row px-4 items-center">
                <Image source={require('../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full"/>
                <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
                <TouchableOpacity>
                    <Text className="font-bold"
                          style={{color: themeColor.text}}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
            {/*dishes*/}
            <ScrollView showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 50}}
                        className="bg-white pt-5">
                {
                    Object.entries(groupItem).map(([key, item]) => {
                        let dish = item[0]
                        return (
                            <View key={key}
                                  className="flex-row items-center space-x-3 py-2 px-4 rounded-full mx-2 mb-3 shadow-md shadow-gray-500">
                                <Text className="font-bold"
                                      style={{color: themeColor.text}}>{item.length} x
                                </Text>
                                <Image source={dish.image} className="h-14 w-14 rounded-full"/>
                                <Text className="flex-1 font-semibold text-base">${dish.name}</Text>
                                <Text className="font-semibold text-base">${dish.price}</Text>
                                <TouchableOpacity className="p-1 rounded-full"
                                                  onPress={() => dispatch(deleteFromCart({id: dish.id}))}
                                                  style={{backgroundColor: themeColor.bgColor(1)}}>
                                    <Icon.Minus stroke="white" strokeWidth={2} height={20} width={20}/>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
            {/* totals */}
            <View className="p-6 px-8 rounded-t-3xl space-y-4" style={{backgroundColor: themeColor.bgColor(0.2)}}>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">${cartTotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee</Text>
                    <Text className="text-gray-700">${deliveryfee}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700 font-extrabold">Order Total</Text>
                    <Text className="text-gray-700 font-extrabold">${deliveryfee + cartTotal}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{backgroundColor: themeColor.bgColor(1)}}
                                      className="p-3 rounded-full"
                                      onPress={() => navigation.navigate('OrderPrepairing')}>
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CartScreen;