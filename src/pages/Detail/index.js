import { useLayoutEffect, useState } from 'react';
import { View,Text,StyleSheet, Pressable, ScrollView ,Image, Modal ,Share} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Entypo, AntDesign, Feather } from '@expo/vector-icons';

import Ingredientes from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import VideoView from '../../components/Video';

import {isFavorite,saveFavorite,removeItem} from '../../utils/storage';

export default function Detail() {
 const route = useRoute();
 const navigation = useNavigation();

 const [showVideo,setShowVideo] = useState(false);
 const [favorite,setFavorite] = useState(false);

 useLayoutEffect(() => {  

     async function getStatusFavorites() {
       const receipeFavorites =  await isFavorite(route.params?.data);
       setFavorite(receipeFavorites);
     };

     getStatusFavorites();

      navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteReceipe(route.params?.data)}>
          {favorite ? (
             <Entypo 
             name="heart"
             size={25} 
             color="#FF4141" 
           />
          ): (
            <Entypo 
            name="heart-outlined"
            size={25} 
            color="#FF4141" 
          />
          )}
        </Pressable>
      )
     })

 },[navigation,route.params?.data,favorite]);

 async function handleFavoriteReceipe(receipe) {
  if(favorite){
    await removeItem(receipe.id)
    setFavorite(false);
  }else{
    await saveFavorite("@appreceitas",receipe);
    setFavorite(true)
  }
 }

 function handleOpenVideo() {
  setShowVideo(true)
 }

 async function shareReceipe() {
   try {
    await Share.share({
      url:route.params?.data.video,
      message: `Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\nVi lá no app receita fácil`
    })
   } catch (error) {
     console.log(error)
   }
 }

 return (
   <ScrollView contentContainerStyle={{ paddingBottom: 14}} style={styles.container} showsHorizontalScrollIndicator={false}>
     <Pressable onPress={handleOpenVideo}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={48} color="#FAFAFA"/>
        </View>
        <Image 
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
     </Pressable>

     <View style={styles.headerDetail}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientesText}>Ingredientes ({route.params?.data.total_ingredients})</Text>
        </View>

        <Pressable onPress={shareReceipe}>
          <Feather name="share-2" size={24} color="#121212"/>
        </Pressable>
     </View>

      {route.params?.data.ingredients.map((item) => (
         <Ingredientes key={item.id} data={item} />
      ))}

      <View style={styles.intructionsArea}>
        <Text style={styles.intructionsText}>Modo de preparo</Text>
        <Feather name="arrow-down" size={24} color="#FFF"/>
      </View>

      {route.params?.data.instructions.map((item, index) => (
         <Instructions key={item.id} data={item} index={index} />
      ))}

      <Modal visible={showVideo} animationType="slide">
        <VideoView  
         handleClose={() => setShowVideo(false)}
         videoUrl={route.params?.data.video}
        />
      </Modal>

   </ScrollView>
  );
}

const styles = StyleSheet.create( {
  container: {
    backgroundColor:'#F3F9FF',
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    height: 200,
    borderRadius: 14,
    width: '100%'
  },
  playIcon: {
    position:'absolute',
    zIndex: 9,
    top: 0,right:0, left: 0, bottom: 0,
    alignItems:'center',
    justifyContent:'center'
  },
  headerDetail: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4
  },
  ingredientesText: {
    marginBottom: 14,
    fontSize: 16
  },
  intructionsArea: {
    backgroundColor: '#4CBE6C',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    marginBottom: 14
  },
  intructionsText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#FFF',
    marginRight: 8
  }
})